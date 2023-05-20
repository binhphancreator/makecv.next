import React, { useMemo } from "react";
import { useAppSelector } from "~/hook";
import { Color, DataRender, Size } from "~/types/document";
import { findColor } from "~/utils/document";
import { renderComponent } from "~/utils/document";

interface PaperProps {
  childrenDataRender?: DataRender[];
  size: Size;
  style?: React.CSSProperties;
  backgroundColor?: Color;
}

const Paper = ({ size, backgroundColor, childrenDataRender }: PaperProps) => {
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

  return (
    <div ref={paperRef} className="paper" style={paperStyle}>
      {renderComponent(childrenDataRender ?? [])}
      <div />
    </div>
  );
};

export default Paper;
