import React, { ForwardedRef, useMemo } from "react";
import classNames from "classnames";
import { resolveComponent } from "~/utils/document";
import { useAppDispatch, useAppSelector } from "~/hook";
import {
  addHoveringKey,
  addSelectingKey,
  refreshSelectingKeys,
  removeHoveringKey,
  setPositionComponentByKey,
  setViewportStatus,
} from "~/redux/documentSlice";
import { ShownNameComponents } from "~/components/document";
import { ViewportStatusEnum } from "~/types/viewport";

interface RendererProps {
  keyRender: string;
}

export interface RendererMethods {}

const RendererComponent = ({ keyRender }: RendererProps, forwardRef: ForwardedRef<RendererMethods>) => {
  const dispatch = useAppDispatch();
  const viewportStatus = useAppSelector((state) => state.documentState.viewport.status);
  const scale = useAppSelector((state) => state.documentState.viewport.scale);
  const hoveringKeys = useAppSelector((state) => state.documentState.hoveringKeys);
  const selectingKeys = useAppSelector((state) => state.documentState.selectingKeys);
  const flatDataRender = useAppSelector((state) => state.documentState.flatDataRender);
  const data = flatDataRender[keyRender];

  React.useImperativeHandle(forwardRef, () => ({}));

  const renderedBlockStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (data.position) {
      style.left = `${data.position.x}px`;
      style.top = `${data.position.y}px`;
    }
    return style;
  }, [data.position, scale]);

  const renderedComponentStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.transform = `scale(${scale})`;
    if (data.size) {
      style.width = `${data.size.width}px`;
      style.height = `${data.size.height}px`;
    }
    return style;
  }, [scale, data.size, data.parentKey]);

  const hovering = useMemo<boolean>(() => {
    if (!data.key) return false;
    if (hoveringKeys.includes(data.key)) {
      return true;
    }
    return false;
  }, [hoveringKeys, data.key]);

  const selecting = useMemo<boolean>(() => {
    if (!data.key) return false;
    if (selectingKeys.includes(data.key)) {
      return true;
    }
    return false;
  }, [selectingKeys, data.key]);

  const showActiveBorder = useMemo<boolean>(() => {
    if ((hovering || selecting) && viewportStatus === ViewportStatusEnum.Idle) {
      return true;
    }
    return false;
  }, [hovering, selecting, viewportStatus]);

  const activeBorderStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (data.size) {
      style.left = "-2px";
      style.top = "-2px";
      style.width = `${data.size.width * scale + 4}px`;
      style.height = `${data.size.height * scale + 4}px`;
    }
    return style;
  }, [data.size, scale]);

  const renderedNameElement = useMemo<JSX.Element | null>(() => {
    var nameComponent = data.component;
    if (!ShownNameComponents.includes(nameComponent)) {
      return null;
    }
    if (data.name && data.name.trim().length) {
      nameComponent = data.name;
    }

    if (!data.parentKey || !data.parentKey.length) {
      return (
        <div
          className={classNames({
            "rendered-name": true,
            active: selecting || hovering,
          })}
        >
          {nameComponent}
        </div>
      );
    }

    return null;
  }, [data.name, data.component, data.parentKey]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.button === 2 || !data.position) {
      return;
    }
    dispatch(setViewportStatus({ status: ViewportStatusEnum.MovingComponent }));
    event.stopPropagation();
    const startX = event.pageX - data.position.x;
    const startY = event.pageY - data.position.y;

    const handleMouseMove = (eventMove: MouseEvent) => {
      dispatch(
        setPositionComponentByKey({
          position: {
            x: eventMove.pageX - startX,
            y: eventMove.pageY - startY,
          },
          key: data.key ?? "",
        })
      );
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (!event.shiftKey) {
        dispatch(refreshSelectingKeys());
      }
      dispatch(addSelectingKey({ key: data.key }));
      dispatch(setViewportStatus({ status: ViewportStatusEnum.Idle }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (viewportStatus !== ViewportStatusEnum.Idle) {
      return;
    }
    dispatch(addHoveringKey({ key: data.key }));
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (viewportStatus !== ViewportStatusEnum.Idle) {
      return;
    }
    dispatch(removeHoveringKey({ key: data.key }));
  };

  const ComponentRender = resolveComponent(data.component);
  if (ComponentRender) {
    return (
      <div style={renderedBlockStyle} className="rendered-block" onMouseDown={handleMouseDown}>
        {showActiveBorder && <div className="active-border" style={activeBorderStyle} />}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="rendered-component"
          style={renderedComponentStyle}
        >
          {renderedNameElement}
          <ComponentRender {...data.options} style={data.style} size={data.size} position={data.position} />
        </div>
      </div>
    );
  }
  return null;
};

const Renderer = React.forwardRef<RendererMethods, RendererProps>(RendererComponent);

export default Renderer;
