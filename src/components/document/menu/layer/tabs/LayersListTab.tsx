import React, { useMemo } from "react";
import LayerItem from "./LayerItem";
import { useAppSelector } from "~/hooks/app";

interface LayersListTabProps {}

const LayersListTab = ({}: LayersListTabProps) => {
  const flatDataRender = useAppSelector((state) => state.documentState.flatDataRender);

  const layerList = useMemo<React.ReactNode>(() => {
    return Object.values(flatDataRender)
      .filter((_) => !_.parentKey)
      .map((_) => {
        return <LayerItem key={_.key} keyRender={_.key} hierarchy={0} />;
      });
  }, [flatDataRender]);

  return <div className="layer-list">{layerList}</div>;
};

export default LayersListTab;
