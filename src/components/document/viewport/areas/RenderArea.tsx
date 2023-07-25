import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/app";
import Renderer from "~/components/document/Renderer";
import { setRenderAreaPosition } from "~/redux/documentSlice";
import { useDocumentEvent } from "~/components/document/event/hooks";
import styles from "@/components/document/viewport/areas/render-area.module.scss";

const RenderArea = () => {
  const dispatch = useAppDispatch();

  const renderAreaPosition = useAppSelector((state) => state.documentState.viewport.renderAreaPosition);
  const flatDataRender = useAppSelector((state) => state.documentState.flatDataRender);
  const scrollSpeed = useAppSelector((state) => state.documentState.viewport.scrollSpeed);

  const containerStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.left = `${renderAreaPosition.x}px`;
    style.top = `${renderAreaPosition.y}px`;
    return style;
  }, [renderAreaPosition]);

  useDocumentEvent("viewport.scroll", (event: React.WheelEvent<HTMLDivElement>) => {
    dispatch(
      setRenderAreaPosition({
        position: {
          x: renderAreaPosition.x - event.deltaX * scrollSpeed,
          y: renderAreaPosition.y - event.deltaY * scrollSpeed,
        },
      })
    );
  });

  return (
    <div style={containerStyle} className={styles.container}>
      {Object.keys(flatDataRender).map((key) => (
        <Renderer key={key} keyRender={key} />
      ))}
    </div>
  );
};

export default RenderArea;
