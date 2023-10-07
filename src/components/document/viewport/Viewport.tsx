import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/app";
import { refreshEdittingContexts, refreshSelectingKeys } from "~/redux/documentSlice";
import BarArea from "./areas/BarArea";
import TouchArea from "./areas/TouchArea";
import FloatArea from "~/components/document/viewport/areas/FloatArea";
import styles from "@/components/document/viewport/viewport.module.scss";
import { color2css } from "~/utils/color";
import { useDocumentViewport } from "~/components/document/viewport/hooks";

const Viewport = () => {
  const dispatch = useAppDispatch();
  const viewport = useDocumentViewport();

  const fill = useAppSelector((state) => state.documentState.viewport.fill);

  const backgroundStyle = useMemo<React.CSSProperties>(() => {
    return {
      background: color2css(fill),
    };
  }, [fill]);

  const refreshOnClickOutside = () => {
    dispatch(refreshSelectingKeys({}));
    dispatch(refreshEdittingContexts());
  };

  return (
    <div className={styles.container} onMouseDown={refreshOnClickOutside} ref={viewport.ref}>
      <div className={styles.background} style={backgroundStyle} />
      <TouchArea />
      <BarArea />
      <FloatArea />
    </div>
  );
};

export default Viewport;
