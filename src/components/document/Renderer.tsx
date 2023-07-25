import React, { useEffect, useMemo } from "react";
import classNames from "classnames";
import { resolveComponent } from "~/utils/document";
import { useAppDispatch, useAppSelector } from "~/hooks/app";
import {
  addHoveringKey,
  addSelectingKey,
  refreshSelectingKeys,
  removeHoveringKey,
  setPositionComponentByKey,
  setViewportStatus,
  updateBoundingSizeComponent,
} from "~/redux/documentSlice";
import { ShownNameComponents } from "~/components/document";
import { ViewportStatusEnum } from "~/enums/viewport";
import styles from "@/components/document/renderer.module.scss";
import { log } from "console";

interface RendererProps {
  keyRender: string;
}

export interface RendererMethods {}

const RendererComponent = ({ keyRender }: RendererProps) => {
  const dispatch = useAppDispatch();
  const viewportStatus = useAppSelector((state) => state.documentState.viewport.status);
  const scale = useAppSelector((state) => state.documentState.viewport.scale);
  const selectingKeys = useAppSelector((state) => state.documentState.selectingKeys);
  const flatDataRender = useAppSelector((state) => state.documentState.flatDataRender);
  const editingContexts = useAppSelector((state) => state.documentState.editingContexts);
  const data = flatDataRender[keyRender];

  const renderedComponentRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((resizeObserverEntry) => {
      if (resizeObserverEntry.length) {
        const { width, height } = resizeObserverEntry[0].contentRect;
        dispatch(updateBoundingSizeComponent({ key: keyRender, boundingSize: { width, height } }));
      }
    });

    if (renderedComponentRef.current) {
      resizeObserver.observe(renderedComponentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

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

  const selecting = useMemo<boolean>(() => {
    if (!data.key) return false;
    if (selectingKeys.includes(data.key)) {
      return true;
    }
    return false;
  }, [selectingKeys, data.key]);

  const showActiveBorder = useMemo<boolean>(() => {
    if (selecting && viewportStatus === ViewportStatusEnum.Idle) {
      return true;
    }
    return false;
  }, [selecting, viewportStatus]);

  const activeBorderStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    const size = data.size || data.boundingSize;
    if (size) {
      style.left = "-2px";
      style.top = "-2px";
      style.width = `${size.width * scale + 4}px`;
      style.height = `${size.height * scale + 4}px`;
    }
    return style;
  }, [data.size, data.boundingSize, scale]);

  const renderedNameElement = useMemo<JSX.Element | null>(() => {
    var nameComponent: string = data.component;
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
            [styles["rendered-name"]]: true,
            [styles.active]: selecting,
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

    if (Object.keys(editingContexts).includes(keyRender)) {
      event.stopPropagation();
      return;
    }

    if (!event.shiftKey) {
      dispatch(refreshSelectingKeys({ key: data.key }));
    } else {
      dispatch(addSelectingKey({ key: data.key }));
    }

    event.stopPropagation();
    const startX = event.pageX - data.position.x;
    const startY = event.pageY - data.position.y;

    const handleMouseMove = (eventMove: MouseEvent) => {
      eventMove.preventDefault();
      dispatch(setViewportStatus({ status: ViewportStatusEnum.MovingComponent }));
      dispatch(
        setPositionComponentByKey({
          position: {
            x: eventMove.pageX - startX,
            y: eventMove.pageY - startY,
          },
          key: data.key,
        })
      );
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
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

  const handleMove = (direction: any) => {
    // Move the block in the specified direction
    switch (direction) {
      case "up":
        dispatch(setViewportStatus({ status: ViewportStatusEnum.MoveByKeyPress }));
        dispatch(
          setPositionComponentByKey({
            position: {
              x: data.position.x,
              y: data.position.y + 10,
            },
            key: data.key,
          })
        );
        break;
      case "down":
        dispatch(setViewportStatus({ status: ViewportStatusEnum.MoveByKeyPress }));
        dispatch(
          setPositionComponentByKey({
            position: {
              x: data.position.x,
              y: data.position.y - 10,
            },
            key: data.key,
          })
        );
        break;
      case "left":
        dispatch(setViewportStatus({ status: ViewportStatusEnum.MoveByKeyPress }));
        dispatch(
          setPositionComponentByKey({
            position: {
              x: data.position.x - 10,
              y: data.position.y,
            },
            key: data.key,
          })
        );
        break;
      case "right":
        dispatch(setViewportStatus({ status: ViewportStatusEnum.MoveByKeyPress }));
        dispatch(
          setPositionComponentByKey({
            position: {
              x: data.position.x + 10,
              y: data.position.y,
            },
            key: data.key,
          })
        );
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (event: any) => {
    switch (event.code) {
      case "ArrowUp":
        console.log(data);
        handleMove("up");
        break;
      case "ArrowDown":
        console.log(2);
        handleMove("down");
        break;
      case "ArrowLeft":
        console.log(3);
        handleMove("left");
        break;
      case "ArrowRight":
        console.log(4);
        handleMove("right");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Add event listener for keyboard input
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("keydown", handleKeyPress);
      dispatch(setViewportStatus({ status: ViewportStatusEnum.Idle }));
    };
  }, [data.key, data.position]);

  const ComponentRender = resolveComponent(data.component);
  if (ComponentRender) {
    return (
      <div style={renderedBlockStyle} className={styles["rendered-block"]} onMouseDown={handleMouseDown}>
        {showActiveBorder && <div className={styles["active-border"]} style={activeBorderStyle} />}
        <div
          ref={renderedComponentRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles["rendered-component"]}
          style={renderedComponentStyle}
        >
          {renderedNameElement}
          <ComponentRender
            {...data.options}
            keyRender={keyRender}
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

const Renderer = RendererComponent;

export default Renderer;
