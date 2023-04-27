import React, { WheelEvent, useEffect, useMemo, useState } from "react";
import { resolveComponent } from "~/utils/document";
import data from "~/data/render";

interface ViewportProps {
  position: {
    x: number;
    y: number;
  };
  scale?: number;
  scrollSpeed?: number;
  scaleSpeed?: number;
}

const Viewport = ({
  position: initialPosition,
  scale: initialScale,
  scrollSpeed: initialScrollSpeed,
  scaleSpeed: initialScaleSpeed,
}: ViewportProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [scale, setScale] = useState(initialScale ?? 1);
  const scrollSpeed = initialScrollSpeed ?? 0.75;
  const scaleSpeed = initialScaleSpeed ?? 0.01;
  const viewportRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    setPosition({
      x: (viewportRef.current?.clientWidth || 0) / 2,
      y: 16,
    });
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
    console.log(event);
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
          {data.map((_, index) => {
            const Component = resolveComponent(_.component);
            const options = _.options ?? {};
            return (
              <Component
                {...options}
                size={_.size}
                position={_.position}
                key={index.toString()}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Viewport;
