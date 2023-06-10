import React, { useMemo } from "react";
import SvgIcon from "~/components/icon/SvgIcon";
import { useAppSelector } from "~/hook";
import { ComponentIconMap } from "~/configs/document";

interface LayerItemProps {
  keyRender: string;
  hierarchy: number;
}

const LayerItem = ({ keyRender, hierarchy }: LayerItemProps) => {
  const marginLeft = 22;
  const flatDataRender = useAppSelector(
    (state) => state.documentState.flatDataRender
  );

  const dataRender = useAppSelector(
    (state) => state.documentState.flatDataRender[keyRender]
  );

  const layerIconName = useMemo<string>(() => {
    if (ComponentIconMap[dataRender.component]) {
      return ComponentIconMap[dataRender.component];
    }
    return ComponentIconMap["default"];
  }, [dataRender, keyRender]);

  const layerItemInnerStyle = useMemo<React.CSSProperties>(() => {
    return {
      marginLeft: `${marginLeft * hierarchy}px`,
    };
  }, [hierarchy]);

  const renderLayerItemChild = () => {
    const childDataRender = Object.values(flatDataRender).filter(
      (_) => _.parentKey === keyRender
    );
    if (childDataRender && childDataRender.length) {
      return childDataRender.map((_) => {
        if (_.key) {
          return (
            <LayerItem
              keyRender={_.key}
              key={_.key}
              hierarchy={hierarchy + 1}
            />
          );
        } else {
          return null;
        }
      });
    }
  };

  if (!dataRender) {
    return null;
  }

  return (
    <div className="layer-item">
      <div style={layerItemInnerStyle} className="layer-item-inner">
        <div className="layer-icon">
          <SvgIcon name={layerIconName} width={16} height={16} />
        </div>
        <div className="layer-name">
          {dataRender.name ?? dataRender.component}
        </div>
      </div>
      {renderLayerItemChild()}
    </div>
  );
};

export default LayerItem;
