import React, { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/app";
import { refreshEdittingContexts, refreshSelectingKeys } from "~/redux/documentSlice";
import BarArea from "./areas/BarArea";
import TouchArea from "./areas/TouchArea";
import FloatArea from "~/components/document/viewport/areas/FloatArea";
import emitter from "~/components/document/event";
import styles from "@/components/document/viewport/viewport.module.scss";
import { color2css } from "~/utils/color";

const Viewport = () => {
  const dispatch = useAppDispatch();
  const viewportRef = useRef<HTMLDivElement>(null);

  const fill = useAppSelector((state) => state.documentState.viewport.fill);

  useEffect(() => {
    const preventDefaultScroll = (e: globalThis.WheelEvent) => e.preventDefault();
    const preventDefaultContextMenu = (e: globalThis.MouseEvent) => e.ctrlKey && e.preventDefault();
    viewportRef.current?.addEventListener("wheel", preventDefaultScroll);
    viewportRef.current?.addEventListener("contextmenu", preventDefaultContextMenu);
    return () => {
      viewportRef.current?.removeEventListener("wheel", preventDefaultScroll);
      viewportRef.current?.removeEventListener("contextmenu", preventDefaultContextMenu);
    };
  }, []);

  const backgroundStyle = useMemo<React.CSSProperties>(() => {
    return {
      background: color2css(fill),
    };
  }, [fill]);

  const handleOnWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.ctrlKey) {
      emitter.dispatch("viewport.scale", event);
    } else {
      emitter.dispatch("viewport.scroll", event);
    }
  };

  const refreshOnClickOutside = () => {
    dispatch(refreshSelectingKeys({}));
    dispatch(refreshEdittingContexts());
  };

  return (
    <div className={styles.container} onWheel={handleOnWheel} onMouseDown={refreshOnClickOutside} ref={viewportRef}>
      <div className={styles.background} style={backgroundStyle} />
      <TouchArea />
      <BarArea />
      <FloatArea />
    </div>
  );
};

export default Viewport;
