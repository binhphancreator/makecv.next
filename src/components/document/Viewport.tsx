import React, {
  ForwardedRef,
  WheelEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "~/hook";
import {
  refreshSelectingKeys,
  setPositionComponentByKey,
  setViewportPosition,
  setViewportScale,
} from "~/redux/documentSlice";
import { Position } from "~/types/document";
import Renderer from "./Renderer";
import LayerMenu from "./menu/layer/LayerMenu";
import EditMenu from "./menu/edit/EditMenu";
import TopMenu from "./menu/top/TopMenu";
import { calcNewPositionAfterScale } from "~/utils/document";

interface ViewportProps {}

export interface ViewportMethods {
  scrollTo(): void;
}

const ViewportComponent = (
  {}: ViewportProps,
  forwardRef: ForwardedRef<ViewportMethods>
) => {
  const dispatch = useAppDispatch();
  const scrollSpeed = useAppSelector(
    (state) => state.documentState.viewport.scrollSpeed
  );
  const scaleSpeed = useAppSelector(
    (state) => state.documentState.viewport.scaleSpeed
  );
  const position = useAppSelector(
    (state) => state.documentState.viewport.position
  );
  const scale = useAppSelector((state) => state.documentState.viewport.scale);
  const flatDataRender = useAppSelector(
    (state) => state.documentState.flatDataRender
  );

  const [originScale, setOriginScale] = useState<number>(1);
  const [originPosition, setOriginPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (originScale == 1 && originPosition.x == 0 && originPosition.y == 0) {
      return;
    }
    const timer = setTimeout(() => {
      setOriginPosition({ x: 0, y: 0 });
      setOriginScale(1);
      reupdatePositionAfterTouchEnd();
    }, 100);
    return () => clearTimeout(timer);
  }, [originPosition, originScale]);

  const reupdatePositionAfterTouchEnd = () => {
    const newViewportPosition = calcNewPositionAfterScale(
      position,
      originPosition,
      originScale
    );
    const deltaViewportPosition: Position = {
      x: newViewportPosition.x - position.x,
      y: newViewportPosition.y - position.y,
    };
    for (let key in flatDataRender) {
      const _ = flatDataRender[key];
      if (_ && _.position) {
        const newPosition = calcNewPositionAfterScale(
          {
            x: _.position.x + position.x,
            y: _.position.y + position.y,
          },
          originPosition,
          originScale
        );
        dispatch(
          setPositionComponentByKey({
            position: {
              x: newPosition.x - position.x - deltaViewportPosition.x,
              y: newPosition.y - position.y - deltaViewportPosition.y,
            },
            key: key,
          })
        );
      }
    }
    dispatch(setViewportPosition({ position: newViewportPosition }));
    dispatch(setViewportScale({ scale: scale * originScale }));
  };

  const viewportRef = React.createRef<HTMLDivElement>();

  React.useImperativeHandle(forwardRef, () => ({
    scrollTo: () => {
      console.log("Scroll To");
    },
  }));

  useEffect(() => {
    const preventDefaultScroll = (e: globalThis.WheelEvent) =>
      e.preventDefault();
    const preventDefaultContextMenu = (e: globalThis.MouseEvent) =>
      e.ctrlKey && e.preventDefault();
    viewportRef.current?.addEventListener("wheel", preventDefaultScroll);
    viewportRef.current?.addEventListener(
      "contextmenu",
      preventDefaultContextMenu
    );
    return () => {
      viewportRef.current?.removeEventListener("wheel", preventDefaultScroll);
      viewportRef.current?.removeEventListener(
        "wheel",
        preventDefaultContextMenu
      );
    };
  }, []);

  const handleOnWheel = (event: WheelEvent) => {
    if (event.ctrlKey) {
      setOriginScale(originScale - originScale * event.deltaY * scaleSpeed);
      setOriginPosition({ x: event.clientX, y: event.clientY });
    } else {
      dispatch(
        setViewportPosition({
          position: {
            x: position.x - event.deltaX * scrollSpeed,
            y: position.y - event.deltaY * scrollSpeed,
          },
        })
      );
    }
  };

  const contentAreaStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.left = `${position.x}px`;
    style.top = `${position.y}px`;
    return style;
  }, [position]);

  const touchAreaStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.transform = `scale(${originScale})`;
    style.left = `${(1 - originScale) * originPosition.x}px`;
    style.top = `${(1 - originScale) * originPosition.y}px`;
    return style;
  }, [originScale, originPosition]);

  const refreshOnClickOutside = () => {
    dispatch(refreshSelectingKeys());
  };

  return (
    <div
      className="viewport"
      onWheel={handleOnWheel}
      onMouseDown={refreshOnClickOutside}
      ref={viewportRef}
    >
      <LayerMenu />
      <EditMenu />
      <TopMenu />
      <div className="scrollbar-vertical" />
      <div className="scrollbar-horizontal" />
      <div
        className={"touch-area"}
        style={touchAreaStyle}
        current-origin={JSON.stringify(originPosition)}
      >
        <div style={contentAreaStyle} className="content-area">
          {Object.keys(flatDataRender).map((key) => (
            <Renderer key={key} keyRender={key} />
          ))}
        </div>
        <div className="trigger-area" />
      </div>
    </div>
  );
};

const Viewport: React.FC<ViewportProps> = React.forwardRef<
  ViewportMethods,
  ViewportProps
>(ViewportComponent);

export default Viewport;
