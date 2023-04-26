import React, { WheelEvent, useEffect, useMemo, useState } from "react";

interface ViewportProps {
  position: {
    x: number;
    y: number;
  };
  scale?: number;
  scrollSpeed?: number;
  children?: React.ReactElement;
}

const Viewport = ({
  position: initialPosition,
  scale: initialScale,
  scrollSpeed: initialScrollSpeed,
  children,
}: ViewportProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [scale, setScale] = useState(initialScale ?? 1);
  const scrollSpeed = initialScrollSpeed ?? 0.75;
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

  const handleMouseDown = (event: any) => {
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

  const handleOnWheel = (e: WheelEvent) => {
    setPosition({
      x: position.x - e.deltaX * scrollSpeed,
      y: position.y - e.deltaY * scrollSpeed,
    });
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default Viewport;
