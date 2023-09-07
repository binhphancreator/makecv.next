import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/components/color/alpha.module.scss";
import { HSBColor } from "~/components/color/types";
import { BoundingSize, Position, Size } from "~/types/document";
import { color2css } from "~/utils/color";

interface AlphaProps {
  hsbColor: HSBColor;
  size?: Size;
  onChange?(alpha?: number): any;
}

const Alpha = ({ hsbColor, size, onChange }: AlphaProps) => {
  const { alpha } = hsbColor;
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
    onChange && onChange(alpha);
  }, [alpha]);

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

  const gradientStyle = useMemo<React.CSSProperties>(() => {
    const colorFrom = color2css({ ...hsbColor, alpha: 0 });
    const colorTo = color2css({ ...hsbColor, alpha: 1 });

    return {
      background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
    };
  }, [hsbColor]);

  const pointerStyle = useMemo<React.CSSProperties>(() => {
    const r = Math.min(boundingSize.width, boundingSize.height);

    return {
      left: `${(alpha ?? 1) * 100}%`,
      width: `${r}px`,
      height: `${r}px`,
      background: color2css(hsbColor),
    };
  }, [alpha, boundingSize, hsbColor]);

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
    onChange && onChange(left / containerWidth);
  };

  return (
    <div className={styles.container} style={containerStyle} ref={containerRef} onMouseDown={handleOnMouseDown}>
      <div className={styles.alpha} />
      <div className={styles.gradient} style={gradientStyle} />
      <div className={styles.pointer} style={pointerStyle} />
    </div>
  );
};

export default Alpha;
