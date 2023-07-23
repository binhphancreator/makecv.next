import React, { Ref, useImperativeHandle, useRef } from "react";
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
import styles from "@/components/document/viewport/areas/touch-area.module.scss";
import RenderArea from "./RenderArea";

interface TouchAreaProps {}

export interface TouchAreaMethods {
  scale(event: React.WheelEvent<HTMLDivElement>): void;
}

const TouchAreaComponent = ({}: TouchAreaProps, forwardRef: Ref<TouchAreaMethods>) => {
  const dispatch = useAppDispatch();

  const flatDataRender = useAppSelector((state) => state.documentState.flatDataRender);
  const renderAreaPosition = useAppSelector((state) => state.documentState.viewport.renderAreaPosition);
  const renderAreaScale = useAppSelector((state) => state.documentState.viewport.renderAreaScale);
  const scaleSpeed = useAppSelector((state) => state.documentState.viewport.scaleSpeed);
  const scrollSpeed = useAppSelector((state) => state.documentState.viewport.scrollSpeed);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerReupdatePosition = useRef<NodeJS.Timeout | null>(null);
  const scale = useRef<number>(1);
  const position = useRef<Position>({
    x: 0,
    y: 0,
  });

  const refresh = () => {
    position.current = {
      x: 0,
      y: 0,
    };
    scale.current = 1;
    update();
  };

  const update = () => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.style.transform = `scale(${scale.current})`;
    containerRef.current.style.left = `${(1 - scale.current) * position.current.x}px`;
    containerRef.current.style.top = `${(1 - scale.current) * position.current.y}px`;
  };

  const recalculatePositionAfterScale = () => {
    const newRenderAreaPosition = calcNewPositionAfterScale(renderAreaPosition, position.current, scale.current);
    const deltaViewportPosition: Position = {
      x: newRenderAreaPosition.x - renderAreaPosition.x,
      y: newRenderAreaPosition.y - renderAreaPosition.y,
    };
    for (let key in flatDataRender) {
      const _ = flatDataRender[key];
      if (_ && _.position) {
        const newPosition = calcNewPositionAfterScale(
          {
            x: _.position.x + renderAreaPosition.x,
            y: _.position.y + renderAreaPosition.y,
          },
          position.current,
          scale.current
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
    dispatch(setRenderAreaScale({ scale: renderAreaScale * scale.current }));
    refresh();
    dispatch(setViewportStatus({ status: ViewportStatusEnum.Idle }));
  };

  useImperativeHandle(forwardRef, () => ({
    scale: (event) => {
      if (event.ctrlKey) {
        const deltaY = Math.sign(event.deltaY);
        const newScale = scale.current - scale.current * deltaY * scaleSpeed;
        scale.current = Math.max(MIN_SCALE_VIEWPORT / renderAreaScale, newScale);
        scale.current = Math.min(MAX_SCALE_VIEWPORT / renderAreaScale, scale.current);
        position.current = {
          x: event.clientX,
          y: event.clientY,
        };
        update();
        dispatch(setViewportStatus({ status: ViewportStatusEnum.ZoomingTouchArea }));
        if (timerReupdatePosition.current) {
          clearTimeout(timerReupdatePosition.current);
        }
        timerReupdatePosition.current = setTimeout(recalculatePositionAfterScale, 200);
      } else {
        dispatch(
          setRenderAreaPosition({
            position: {
              x: renderAreaPosition.x - event.deltaX * scrollSpeed,
              y: renderAreaPosition.y - event.deltaY * scrollSpeed,
            },
          })
        );
      }
    },
  }));

  return (
    <div ref={containerRef} className={styles.container}>
      <RenderArea />
    </div>
  );
};

const TouchArea = React.forwardRef<TouchAreaMethods, TouchAreaProps>(TouchAreaComponent);

export default TouchArea;
