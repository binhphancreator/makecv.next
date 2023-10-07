import React, { useEffect, useMemo, useRef, useState } from "react";
import { HSBColor } from "~/components/color/types";
import { BoundingSize, Position, Size } from "~/types/document";
import classNames from "classnames";
import styles from "@/components/color/hue.module.scss";

export type HueDirection = "vertical" | "horizontal";

interface HueProps {
  hsbColor: HSBColor;
  size?: Size;
  onChange?(hue: number): any;
}

const Hue = ({ hsbColor, size, onChange }: HueProps) => {
  const { hue } = hsbColor;
  const [boundingSize, setBoundingSize] = useState<BoundingSize>({ height: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const boundingClientRect = containerRef.current.getBoundingClientRect();
    const { width, height } = boundingClientRect;
    setBoundingSize({
      width,
      height,
    });
  }, []);

  useEffect(() => {
    onChange && onChange(hue);
  }, [hue]);

  const containerStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (typeof size?.width === "number") {
      style.width = `${size.width}px`;
    }
    if (typeof size?.height === "number") {
      style.height = `${size.height}px`;
    }
    return style;
  }, [size]);

  const pointerStyle = useMemo<React.CSSProperties>(() => {
    const r = Math.min(boundingSize.width, boundingSize.height);

    return {
      left: `${(hue / 360) * 100}%`,
      width: `${r}px`,
      height: `${r}px`,
    };
  }, [hue, boundingSize]);

  const handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!containerRef.current) {
      return;
    }
    const boundingClientRect = containerRef.current.getBoundingClientRect();
    const { left: containerLeft, top: containerTop } = boundingClientRect;

    updatePointerPosition({
      x: event.pageX - containerLeft,
      y: event.pageY - containerTop,
    });

    const onMouseMove = (eventMove: MouseEvent) => {
      eventMove.preventDefault();
      updatePointerPosition({
        x: eventMove.pageX - containerLeft,
        y: eventMove.pageY - containerTop,
      });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const updatePointerPosition = (position: Position) => {
    if (!containerRef.current) {
      return;
    }
    const { width: containerWidth } = containerRef.current.getBoundingClientRect();
    const left = Math.min(Math.max(0, position.x), containerWidth);
    onChange && onChange((left / containerWidth) * 360);
  };

  return (
    <div className={styles.container} ref={containerRef} style={containerStyle} onMouseDown={handleOnMouseDown}>
      <div className={classNames([styles.hue, styles.horizontal])} />
      <div className={styles.pointer} style={pointerStyle} />
    </div>
  );
};

export default Hue;
