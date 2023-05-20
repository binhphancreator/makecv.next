import React, { useMemo } from "react";
import { useAppSelector } from "~/hook";
import { Color, Size } from "~/types/document";
import { findColor } from "~/utils/document";

interface PaperProps {
  size: Size;
  style?: React.CSSProperties;
  backgroundColor?: Color;
}

const Paper = ({ size, backgroundColor }: PaperProps) => {
  const colorPaletes = useAppSelector(
    (state) => state.documentState.colorPalettes
  );

  const paperRef = React.createRef<HTMLDivElement>();

  const paperStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.width = `${size.width}px`;
    style.minHeight = `${size.height}px`;
    style.minWidth = `${size.width}px`;
    style.maxWidth = `${size.width}px`;

    if (backgroundColor && backgroundColor.length) {
      style.backgroundColor = findColor(backgroundColor, colorPaletes);
    }

    return style;
  }, [size, backgroundColor]);

  return <div ref={paperRef} className="paper" style={paperStyle} />;
};

export default Paper;
