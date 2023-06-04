import React, { useMemo, useState } from "react";
import { useAppSelector } from "~/hook";

interface LayerMenuProps {
  width?: number;
}

export interface LayerMenuMethods {}

const LayerMenu = ({ width: initialWidth }: LayerMenuProps) => {
  const flatDataRender = useAppSelector(
    (state) => state.documentState.flatDataRender
  );
  const [width] = useState(initialWidth ?? 400);

  const layerList = useMemo<JSX.Element | null>(() => {
    return null;
  }, [flatDataRender]);

  const layerMenuStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.width = `${width}px`;
    return style;
  }, [width]);

  return (
    <div className="layer-menu" style={layerMenuStyle}>
      {layerList}
      <div />
    </div>
  );
};

export default LayerMenu;
