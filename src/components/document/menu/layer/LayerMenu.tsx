import React, { useMemo } from "react";
import { MotionStyle, motion } from "framer-motion";
import LayersListTab from "./tabs/LayersListTab";
import ComponentsTab from "./tabs/ComponentsTab";
import AssetsTab from "./tabs/AssetsTab";
import { MIN_WIDTH_LAYER_MENU, MAX_WIDTH_LAYER_MENU } from "~/constants/document";
import { useAppDispatch, useAppSelector } from "~/hooks/app";
import { setViewportStatus, setWidthLayerMenu } from "~/redux/documentSlice";
import { ViewportStatusEnum } from "~/types/viewport";
import styles from "@/components/document/menu/layer.module.scss";

interface LayerMenuProps {}

export interface LayerMenuMethods {}

const TABS_DATA = [
  { label: "Layers", component: LayersListTab, name: "layers_tab" },
  { label: "Components", component: ComponentsTab, name: "components_tab" },
  { label: "Assets", component: AssetsTab, name: "assets_tab" },
];

const LayerMenu = ({}: LayerMenuProps) => {
  const dispatch = useAppDispatch();
  const heightTopMenu = useAppSelector((state) => state.documentState.viewport.heightTopMenu);
  const width = useAppSelector((state) => state.documentState.viewport.widthLayerMenu);
  const tabActiveIndex = useAppSelector((state) => state.documentState.viewport.tabActiveIndexLayerMenu);
  const refLayerMenu = React.createRef<HTMLDivElement>();

  const layerMenuStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: `${width}px`,
      paddingTop: `${heightTopMenu + 16}px`,
    };
  }, [width, heightTopMenu]);

  const tabViewInnerStyle = useMemo<MotionStyle>(() => {
    return {
      width: `${width * TABS_DATA.length}px`,
      position: "absolute",
      left: 0,
      top: 0,
    };
  }, [width]);

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

  const handleOnMouseDownResize = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const startX = event.pageX - width;
    dispatch(setViewportStatus({ status: ViewportStatusEnum.ResizingLayerMenu }));

    const handleMouseMoveResize = (eventMove: MouseEvent) => {
      if (eventMove.pageX - startX <= MAX_WIDTH_LAYER_MENU && eventMove.pageX - startX >= MIN_WIDTH_LAYER_MENU) {
        dispatch(setWidthLayerMenu({ width: eventMove.pageX - startX }));
      }
    };

    const handleMouseUpResize = () => {
      window.removeEventListener("mousemove", handleMouseMoveResize);
      window.removeEventListener("mouseup", handleMouseUpResize);
      dispatch(setViewportStatus({ status: ViewportStatusEnum.Idle }));
    };

    window.addEventListener("mousemove", handleMouseMoveResize);
    window.addEventListener("mouseup", handleMouseUpResize);
  };

  return (
    <div ref={refLayerMenu} className={styles["layer-menu"]} style={layerMenuStyle}>
      <div className={styles["resize-area"]} onMouseDown={handleOnMouseDownResize} />
      <div className={styles["tabs-view"]}>
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
