import React, { useLayoutEffect, useMemo, useState } from "react";

interface TouchPaperProps {
  position: {
    x: number;
    y: number;
  };
  scale?: number;
  children?: React.ReactElement;
}

const TouchPaper = ({
  position: initialPosition,
  scale: initialScale,
  children,
}: TouchPaperProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [scale, setScale] = useState(initialScale ?? 1);
  const viewportRef = React.createRef<HTMLDivElement>();
  const touchPaperRef = React.createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    setPosition({
      x:
        (viewportRef.current?.clientWidth || 0) / 2 -
        (touchPaperRef.current?.clientWidth || 0) / 2,
      y: 16,
    });
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

  const touchPaperStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {
      left: position?.x ?? 0 + "px",
      top: position?.y ?? 0 + "px",
      transform: `scale(${scale})`,
    };
    return style;
  }, [position, scale]);

  return (
    <div className="viewport-paper" ref={viewportRef}>
      <div
        className={"touch-paper"}
        style={touchPaperStyle}
        onMouseDown={handleMouseDown}
        ref={touchPaperRef}
      >
        {children}
      </div>
    </div>
  );
};

export default TouchPaper;
