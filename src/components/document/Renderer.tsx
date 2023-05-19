import React, { ForwardedRef, useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import { DataRender } from "~/types/document";
import { resolveComponent } from "~/utils/document";
import { useAppDispatch, useAppSelector } from "~/hook";
import {
  addHoveringKey,
  addSelectingKey,
  refreshSelectingKeys,
  removeHoveringKey,
  setPositionComponentByKey,
} from "~/redux/documentSlice";

interface RendererProps {
  data: DataRender;
}

export interface RendererMethods {}

const RendererComponent = (
  { data }: RendererProps,
  forwardRef: ForwardedRef<RendererMethods>
) => {
  const dispatch = useAppDispatch();
  const scale = useAppSelector((state) => state.documentState.viewport.scale);
  const hoveringKeys = useAppSelector(
    (state) => state.documentState.hoveringKeys
  );
  const selectingKeys = useAppSelector(
    (state) => state.documentState.selectingKeys
  );

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
  }, [scale, data]);

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

  const renderedName = useMemo<string>(() => {
    if (data.name && data.name.trim().length) {
      return data.name;
    }
    return data.component;
  }, [data.name, data.component]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.button === 2 || !data.position) {
      return;
    }
    event.stopPropagation();
    const startX = event.pageX - data.position.x;
    const startY = event.pageY - data.position.y;

    const handleMouseMove = (eventMove: any) => {
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
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const ComponentRender = resolveComponent(data.component);
  if (ComponentRender) {
    return (
      <div
        style={renderedBlockStyle}
        className="rendered-block"
        onMouseDown={handleMouseDown}
      >
        {(hovering || selecting) && (
          <div className="active-border" style={activeBorderStyle} />
        )}
        <div
          onMouseEnter={() => dispatch(addHoveringKey({ key: data.key }))}
          onMouseLeave={() => dispatch(removeHoveringKey({ key: data.key }))}
          className="rendered-component"
          style={renderedComponentStyle}
        >
          <div
            className={classNames({
              "rendered-name": true,
              active: selecting || hovering,
            })}
          >
            {renderedName}
          </div>
          <ComponentRender
            {...data.options}
            childrenDataRender={data.children}
            style={data.style}
            size={data.size}
            position={data.position}
          />
        </div>
      </div>
    );
  }
  return null;
};

const Renderer = React.forwardRef<RendererMethods, RendererProps>(
  RendererComponent
);

export default Renderer;
