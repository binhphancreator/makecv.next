import React, { useMemo } from "react";
import { useAppSelector } from "~/hook";
import { Position, Size, Color } from "~/types/document";
import { findColor } from "~/utils/document";

interface BackgroundProps {
  size: Size;
  position?: Position;
  backgroundColor?: Color;
}

const Background = ({ size, backgroundColor }: BackgroundProps) => {
  const colorPaletes = useAppSelector(
    (state) => state.documentState.colorPalettes
  );

  const backgroundStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.width = `${size.width}px`;
    style.height = `${size.height}px`;

    if (backgroundColor && backgroundColor.length) {
      style.backgroundColor = `${findColor(backgroundColor, colorPaletes)}`;
    }

    return style;
  }, [size, backgroundColor, colorPaletes]);

  return <div style={backgroundStyle} />;
};

export default Background;
