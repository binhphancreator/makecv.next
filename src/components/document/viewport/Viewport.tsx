import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "~/hooks/app";
import { refreshEdittingContexts, refreshSelectingKeys } from "~/redux/documentSlice";
import BarArea from "./areas/BarArea";
import TouchArea from "./areas/TouchArea";
import FloatArea from "~/components/document/viewport/areas/FloatArea";
import emitter from "~/components/document/event";
import styles from "@/components/document/viewport/viewport.module.scss";

const Viewport = () => {
  const dispatch = useAppDispatch();
  const viewportRef = useRef<HTMLDivElement>(null);

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
      <TouchArea />
      <BarArea />
      <FloatArea />
    </div>
  );
};

export default Viewport;
