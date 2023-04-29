import React, {
  ForwardedRef,
  WheelEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppSelector } from "~/hook";
import { renderComponent } from "~/utils/document";

interface ViewportProps {
  position: {
    x: number;
    y: number;
  };
  scale?: number;
  scrollSpeed?: number;
  scaleSpeed?: number;
}

export interface ViewportMethods {
  scrollTo(): void;
}

const ViewportComponent = (
  {
    position: initialPosition,
    scale: initialScale,
    scrollSpeed: initialScrollSpeed,
    scaleSpeed: initialScaleSpeed,
  }: ViewportProps,
  forwardRef: ForwardedRef<ViewportMethods>
) => {
  const [position, setPosition] = useState(initialPosition);
  const [scale, setScale] = useState(initialScale ?? 1);
  const scrollSpeed = initialScrollSpeed ?? 0.75;
  const scaleSpeed = initialScaleSpeed ?? 0.01;
  const viewportRef = React.createRef<HTMLDivElement>();
  const dataRender = useAppSelector((state) => state.documentState.dataRender);

  React.useImperativeHandle(forwardRef, () => ({
    scrollTo: () => {
      console.log("Scroll To");
    },
  }));

  useEffect(() => {
    const preventDefault = (e: globalThis.WheelEvent) => e.preventDefault();
    viewportRef.current?.addEventListener("wheel", preventDefault);
    return () => {
      viewportRef.current?.removeEventListener("wheel", preventDefault);
    };
  }, []);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.button === 2) {
      return;
    }
    const startX = event.pageX - position?.x;
    const startY = event.pageY - position?.y;

    const handleMouseMove = (eventMove: any) => {
      setPosition({
        x: eventMove.pageX - startX,
        y: eventMove.pageY - startY,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleOnWheel = (event: WheelEvent) => {
    if (event.ctrlKey) {
      setScale(scale - scale * event.deltaY * scaleSpeed);
    } else {
      setPosition({
        x: position.x - event.deltaX * scrollSpeed,
        y: position.y - event.deltaY * scrollSpeed,
      });
    }
  };

  const contentAreaStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {
      left: position?.x ?? 0 + "px",
      top: position?.y ?? 0 + "px",
      transform: `scale(${scale})`,
    };
    return style;
  }, [position, scale]);

  return (
    <div className="viewport" onWheel={handleOnWheel} ref={viewportRef}>
      <div className="scrollbar-vertical" />
      <div className="scrollbar-horizontal" />
      <div className={"touch-area"}>
        <div
          style={contentAreaStyle}
          onMouseDown={handleMouseDown}
          className="content-area"
        >
          {renderComponent(dataRender)}
        </div>
      </div>
    </div>
  );
};

const Viewport: React.FC<ViewportProps> = React.forwardRef<
  ViewportMethods,
  ViewportProps
>(ViewportComponent);

export default Viewport;
