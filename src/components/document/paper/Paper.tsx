import React, { useMemo, useState } from "react";
import { Size } from "~/types/document";

interface PaperProps {
  children?: React.ReactElement;
  size: "A3" | "A4" | "A5" | Size;
  style?: React.CSSProperties;
}

const Paper = ({ size: intialSize, style }: PaperProps) => {
  const originalSize = useMemo(() => {
    var defaultSize: Size = {
      width: 545,
      height: 842,
    };

    if (typeof intialSize === "object") {
      return intialSize;
    }

    return defaultSize;
  }, [intialSize]);

  const [size, setSize] = useState<Size>(originalSize);
  const paperRef = React.createRef<HTMLDivElement>();

  const paperStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: `${size.width}px`,
      minHeight: `${size.height}px`,
      minWidth: `${size.width}px`,
      maxWidth: `${size.width}px`,
    };
  }, [size]);

  return (
    <div
      ref={paperRef}
      className="paper"
      style={{ ...paperStyle, ...(style || {}) }}
    >
      <h1>Paper</h1>
    </div>
  );
};

export default Paper;
