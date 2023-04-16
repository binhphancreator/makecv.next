import React, { useMemo, useState } from "react";

interface PaperProps {
  children?: React.ReactElement;
  size: "A3" | "A4" | "A5" | PaperSize;
  style?: React.CSSProperties;
}

export type PaperSize = {
  width: number;
  height: number;
};

const Paper = ({ size: intialSize, style }: PaperProps) => {
  const findSizePage = () => {
    var defaultSize: PaperSize = {
      width: 545,
      height: 842,
    };

    if (typeof intialSize === "object") {
      return intialSize;
    }

    return defaultSize;
  };

  const [size, setSize] = useState<PaperSize>(findSizePage());
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
