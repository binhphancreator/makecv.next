import React, { ForwardedRef, useMemo, useState } from "react";
import { DataRender } from "~/types/document";
import { resolveComponent } from "~/utils/document";
import { useAppDispatch, useAppSelector } from "~/hook";
import { setPositionComponentByKey } from "~/redux/documentSlice";

interface RendererProps {
  data: DataRender;
}

export interface RendererMethods {}

const RendererComponent = (
  { data }: RendererProps,
  forwardRef: ForwardedRef<RendererMethods>
) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const scale = useAppSelector((state) => state.documentState.viewport.scale);
  const viewportPosition = useAppSelector(
    (state) => state.documentState.viewport.position
  );

  React.useImperativeHandle(forwardRef, () => ({}));

  const renderedBlockStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (data.position) {
      style.left = `${data.position.x}px`;
      style.top = `${data.position.y}px`;
    }
    return style;
  }, [data, scale, viewportPosition]);

  const renderedComponentStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.transform = `scale(${scale})`;
    if (data.size) {
      style.width = `${data.size.width}px`;
      style.height = `${data.size.height}px`;
    }
    return style;
  }, [scale, data]);

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
        <div
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          className="rendered-component"
          style={renderedComponentStyle}
        >
          {isHovered && (
            <div className="rendered-border">
              <span className="top" />
              <span className="left" />
              <span className="right" />
              <span className="bottom" />
            </div>
          )}
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
