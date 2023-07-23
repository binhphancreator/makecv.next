import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "~/hooks/app";
import { refreshSelectingKeys } from "~/redux/documentSlice";
import BarArea from "./areas/BarArea";
import TouchArea, { TouchAreaMethods } from "./areas/TouchArea";
import styles from "@/components/document/viewport/viewport.module.scss";

const Viewport = () => {
  const dispatch = useAppDispatch();

  const scaleAreaRef = useRef<TouchAreaMethods>(null);
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
    scaleAreaRef.current?.scale(event);
  };

  const refreshOnClickOutside = () => {
    dispatch(refreshSelectingKeys({}));
  };

  return (
    <div className={styles.container} onWheel={handleOnWheel} onMouseDown={refreshOnClickOutside} ref={viewportRef}>
      <BarArea />
      <TouchArea ref={scaleAreaRef} />
    </div>
  );
};

export default Viewport;
