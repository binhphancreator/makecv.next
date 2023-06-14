import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import LayersListTab from "./tabs/LayersListTab";
import ComponentsTab from "./tabs/ComponentsTab";
import AssetsTab from "./tabs/AssetsTab";

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
  const [width] = useState(initialWidth ?? 300);
  const [tabActiveIndex, setTabActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const layerMenuStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.width = `${width}px`;
    return style;
  }, [width]);

  const tabViewStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: `${width}px`,
      position: "absolute",
      left: 0,
      top: 0,
      overflow: "hidden",
    };
  }, [width]);

  const tabViewVariants: Variants = {
    enter: { opacity: 0 },
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
    },
  };

  const handleOnTabClick = (tabIndex: number) => {
    if (tabIndex === tabActiveIndex) {
      return;
    }
    setTabActiveIndex(tabIndex);
  };

  const renderTabView = () => {
    const tabData = TABS_DATA[tabActiveIndex];
    if (!tabData) {
      return null;
    }

    const TabComponent = tabData.component;

    return (
      <motion.div
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        variants={tabViewVariants}
        style={tabViewStyle}
        key={tabData.name}
      >
        <TabComponent />
      </motion.div>
    );
  };

  return (
    <div className="layer-menu" style={layerMenuStyle}>
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
        <AnimatePresence initial={false} mode="sync">
          {renderTabView()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LayerMenu;
