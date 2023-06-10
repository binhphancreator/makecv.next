import React, { useMemo, useState } from "react";
import LayerItem from "./LayerItem";
import { useAppSelector } from "~/hook";

interface LayerMenuProps {
  width?: number;
}

export interface LayerMenuMethods {}

const LayerMenu = ({ width: initialWidth }: LayerMenuProps) => {
  const flatDataRender = useAppSelector(
    (state) => state.documentState.flatDataRender
  );
  const [width] = useState(initialWidth ?? 300);

  const layerList = useMemo<React.ReactNode>(() => {
    return Object.values(flatDataRender)
      .filter((_) => !_.parentKey)
      .map((_) => {
        if (_.key) {
          return <LayerItem key={_.key} keyRender={_.key} hierarchy={0} />;
        } else {
          return null;
        }
      });
  }, [flatDataRender]);

  const layerMenuStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.width = `${width}px`;
    return style;
  }, [width]);

  return (
    <div className="layer-menu" style={layerMenuStyle}>
      {layerList}
    </div>
  );
};

export default LayerMenu;
