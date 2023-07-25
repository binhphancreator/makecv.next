import React, { useRef } from "react";
import { Position } from "~/types/document";
import { calcNewPositionAfterScale } from "~/utils/document";
import { useAppDispatch, useAppSelector } from "~/hooks/app";
import {
  setPositionComponentByKey,
  setRenderAreaPosition,
  setRenderAreaScale,
  setViewportStatus,
} from "~/redux/documentSlice";
import { ViewportStatusEnum } from "~/enums/viewport";
import { MAX_SCALE_VIEWPORT, MIN_SCALE_VIEWPORT } from "~/constants/document";
import RenderArea from "./RenderArea";
import { useDocumentEvent } from "~/components/document/event/hooks";
import styles from "@/components/document/viewport/areas/touch-area.module.scss";

const TouchAreaComponent = () => {
  const dispatch = useAppDispatch();

  const flatDataRender = useAppSelector((state) => state.documentState.flatDataRender);
  const renderAreaPosition = useAppSelector((state) => state.documentState.viewport.renderAreaPosition);
  const renderAreaScale = useAppSelector((state) => state.documentState.viewport.renderAreaScale);
  const scaleSpeed = useAppSelector((state) => state.documentState.viewport.scaleSpeed);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerReupdatePositionRef = useRef<NodeJS.Timeout | null>(null);
  const scaleRef = useRef<number>(1);
  const positionRef = useRef<Position>({
    x: 0,
    y: 0,
  });

  useDocumentEvent("viewport.scale", (event) => {
    const deltaY = Math.sign(event.deltaY);
    const newScale = scaleRef.current - scaleRef.current * deltaY * scaleSpeed;
    scaleRef.current = Math.max(MIN_SCALE_VIEWPORT / renderAreaScale, newScale);
    scaleRef.current = Math.min(MAX_SCALE_VIEWPORT / renderAreaScale, scaleRef.current);
    positionRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
    update();
    dispatch(setViewportStatus({ status: ViewportStatusEnum.ZoomingTouchArea }));
    if (timerReupdatePositionRef.current) {
      clearTimeout(timerReupdatePositionRef.current);
    }
    timerReupdatePositionRef.current = setTimeout(recalculatePositionAfterScale, 200);
  });

  const refresh = () => {
    positionRef.current = {
      x: 0,
      y: 0,
    };
    scaleRef.current = 1;
    update();
  };

  const update = () => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.style.transform = `scale(${scaleRef.current})`;
    containerRef.current.style.left = `${(1 - scaleRef.current) * positionRef.current.x}px`;
    containerRef.current.style.top = `${(1 - scaleRef.current) * positionRef.current.y}px`;
  };

  const recalculatePositionAfterScale = () => {
    const newRenderAreaPosition = calcNewPositionAfterScale(renderAreaPosition, positionRef.current, scaleRef.current);
    const deltaViewportPosition: Position = {
      x: newRenderAreaPosition.x - renderAreaPosition.x,
      y: newRenderAreaPosition.y - renderAreaPosition.y,
    };
    for (const key in flatDataRender) {
      const data = flatDataRender[key];
      if (data && data.position) {
        const newPosition = calcNewPositionAfterScale(
          {
            x: data.position.x + renderAreaPosition.x,
            y: data.position.y + renderAreaPosition.y,
          },
          positionRef.current,
          scaleRef.current
        );
        dispatch(
          setPositionComponentByKey({
            position: {
              x: newPosition.x - renderAreaPosition.x - deltaViewportPosition.x,
              y: newPosition.y - renderAreaPosition.y - deltaViewportPosition.y,
            },
            key: key,
          })
        );
      }
    }
    dispatch(setRenderAreaPosition({ position: newRenderAreaPosition }));
    dispatch(setRenderAreaScale({ scale: renderAreaScale * scaleRef.current }));
    refresh();
    dispatch(setViewportStatus({ status: ViewportStatusEnum.Idle }));
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <RenderArea />
    </div>
  );
};

const TouchArea = TouchAreaComponent;

export default TouchArea;
