import React, { useMemo, useState } from "react";
import { MotionStyle, motion } from "framer-motion";
import LayersListTab from "./tabs/LayersListTab";
import ComponentsTab from "./tabs/ComponentsTab";
import AssetsTab from "./tabs/AssetsTab";
import {
  MIN_WIDTH_LAYER_MENU,
  MAX_WIDTH_LAYER_MENU,
} from "~/constants/document";

interface LayerMenuProps {
  width?: number;
}

export interface LayerMenuMethods {}

const TABS_DATA = [
  { label: "Layers", component: LayersListTab, name: "layers_tab" },
  { label: "Components", component: ComponentsTab, name: "components_tab" },
  { label: "Assets", component: AssetsTab, name: "assets_tab" },
];

const LayerMenu = ({ width: initialWidth }: LayerMenuProps) => {
  const [width, setWidth] = useState(initialWidth ?? MIN_WIDTH_LAYER_MENU);
  const [tabActiveIndex, setTabActiveIndex] = useState(0);
  const refLayerMenu = React.createRef<HTMLDivElement>();

  const layerMenuStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.width = `${width}px`;
    return style;
  }, [width]);

  const tabViewInnerStyle = useMemo<MotionStyle>(() => {
    return {
      width: `${width * TABS_DATA.length}px`,
      position: "absolute",
      left: 0,
      top: "16px",
    };
  }, [width]);

  const handleOnTabClick = (tabIndex: number) => {
    if (tabIndex === tabActiveIndex) {
      return;
    }
    setTabActiveIndex(tabIndex);
  };

  const renderTabView = () => {
    return TABS_DATA.map((tabData, index) => {
      const TabComponent = tabData.component;
      const tabViewStyle: React.CSSProperties = {
        position: "absolute",
        width: `${width}px`,
        top: 0,
        left: index * width,
      };
      return (
        <div key={tabData.name} style={tabViewStyle}>
          <TabComponent />
        </div>
      );
    });
  };

  const handleOnMouseDownResize = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    var startX = event.pageX;
    const originWidth = width;

    const handleMouseMoveResize = (eventMove: MouseEvent) => {
      const deltaX = eventMove.pageX - startX;
      if (
        originWidth + deltaX <= MAX_WIDTH_LAYER_MENU &&
        originWidth + deltaX >= MIN_WIDTH_LAYER_MENU
      ) {
        setWidth(originWidth + deltaX);
      }
    };

    const handleMouseUpResize = () => {
      window.removeEventListener("mousemove", handleMouseMoveResize);
      window.removeEventListener("mouseup", handleMouseUpResize);
    };

    window.addEventListener("mousemove", handleMouseMoveResize);
    window.addEventListener("mouseup", handleMouseUpResize);
  };

  return (
    <div ref={refLayerMenu} className="layer-menu" style={layerMenuStyle}>
      <div className="resize-area" onMouseDown={handleOnMouseDownResize} />
      <div className="menu-tabs">
        {TABS_DATA.map((tabData, index) => {
          return (
            <div
              key={tabData.name}
              onClick={() => handleOnTabClick(index)}
              className="menu-tab-item"
            >
              {tabData.label}
            </div>
          );
        })}
      </div>
      <div className="tabs-view">
        <motion.div
          animate={{ x: -tabActiveIndex * width }}
          transition={{
            x: { ease: "easeIn", duration: 0.2 },
          }}
          style={tabViewInnerStyle}
        >
          {renderTabView()}
        </motion.div>
      </div>
    </div>
  );
};

export default LayerMenu;
