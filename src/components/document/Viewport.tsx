import React, {
  ForwardedRef,
  WheelEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "~/hook";
import {
  refreshSelectingKeys,
  reupdateAfterTouchEnd,
  setViewportPosition,
} from "~/redux/documentSlice";
import { Position } from "~/types/document";
import Renderer from "./Renderer";

interface ViewportProps {}

export interface ViewportMethods {
  scrollTo(): void;
}

const ViewportComponent = (
  {}: ViewportProps,
  forwardRef: ForwardedRef<ViewportMethods>
) => {
  const dispatch = useAppDispatch();
  const scrollSpeed = useAppSelector(
    (state) => state.documentState.viewport.scrollSpeed
  );
  const scaleSpeed = useAppSelector(
    (state) => state.documentState.viewport.scaleSpeed
  );
  const position = useAppSelector(
    (state) => state.documentState.viewport.position
  );
  const flatDataRender = useAppSelector(
    (state) => state.documentState.flatDataRender
  );

  const [originScale, setOriginScale] = useState<number>(1);
  const [originPosition, setOriginPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (originScale == 1 && originPosition.x == 0 && originPosition.y == 0) {
      return;
    }
    const timer = setTimeout(() => {
      dispatch(
        reupdateAfterTouchEnd({
          scale: originScale,
          originPosition: originPosition,
        })
      );
      setOriginPosition({ x: 0, y: 0 });
      setOriginScale(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [originPosition]);

  const viewportRef = React.createRef<HTMLDivElement>();

  React.useImperativeHandle(forwardRef, () => ({
    scrollTo: () => {
      console.log("Scroll To");
    },
  }));

  useEffect(() => {
    const preventDefaultScroll = (e: globalThis.WheelEvent) =>
      e.preventDefault();
    const preventDefaultContextMenu = (e: globalThis.MouseEvent) =>
      e.ctrlKey && e.preventDefault();
    viewportRef.current?.addEventListener("wheel", preventDefaultScroll);
    viewportRef.current?.addEventListener(
      "contextmenu",
      preventDefaultContextMenu
    );
    return () => {
      viewportRef.current?.removeEventListener("wheel", preventDefaultScroll);
      viewportRef.current?.removeEventListener(
        "wheel",
        preventDefaultContextMenu
      );
    };
  }, []);

  const handleOnWheel = (event: WheelEvent) => {
    if (event.ctrlKey) {
      setOriginScale(originScale - originScale * event.deltaY * scaleSpeed);
      setOriginPosition({ x: event.clientX, y: event.clientY });
    } else {
      dispatch(
        setViewportPosition({
          position: {
            x: position.x - event.deltaX * scrollSpeed,
            y: position.y - event.deltaY * scrollSpeed,
          },
        })
      );
    }
  };

  const contentAreaStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.left = `${position.x}px`;
    style.top = `${position.y}px`;
    return style;
  }, [position]);

  const touchAreaStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.transform = `scale(${originScale})`;
    style.left = `${(1 - originScale) * originPosition.x}px`;
    style.top = `${(1 - originScale) * originPosition.y}px`;
    return style;
  }, [originScale, originPosition]);

  const refreshOnClickOutside = () => {
    dispatch(refreshSelectingKeys());
  };

  return (
    <div
      className="viewport"
      onWheel={handleOnWheel}
      onMouseDown={refreshOnClickOutside}
      ref={viewportRef}
    >
      <div className="scrollbar-vertical" />
      <div className="scrollbar-horizontal" />
      <div
        className={"touch-area"}
        style={touchAreaStyle}
        current-origin={JSON.stringify(originPosition)}
      >
        <div style={contentAreaStyle} className="content-area">
          {Object.keys(flatDataRender).map((key) => (
            <Renderer key={key} keyRender={key} />
          ))}
        </div>
        <div className="trigger-area" />
      </div>
    </div>
  );
};

const Viewport: React.FC<ViewportProps> = React.forwardRef<
  ViewportMethods,
  ViewportProps
>(ViewportComponent);

export default Viewport;
