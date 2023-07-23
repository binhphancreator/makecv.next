import React, { useMemo } from "react";
import { useAppSelector } from "~/hooks/app";
import Renderer from "~/components/document/Renderer";
import styles from "@/components/document/viewport/areas/render-area.module.scss";

const RenderArea = () => {
  const position = useAppSelector((state) => state.documentState.viewport.renderAreaPosition);
  const flatDataRender = useAppSelector((state) => state.documentState.flatDataRender);

  const containerStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.left = `${position.x}px`;
    style.top = `${position.y}px`;
    return style;
  }, [position]);

  return (
    <div style={containerStyle} className={styles.container}>
      {Object.keys(flatDataRender).map((key) => (
        <Renderer key={key} keyRender={key} />
      ))}
    </div>
  );
};

export default RenderArea;
