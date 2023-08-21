import React, { useEffect, useMemo, useRef, useState } from "react";
import { BoundingSize, Position, Size } from "~/types/document";
import { HSBColor } from "~/components/color/types";
import styles from "@/components/color/saturation.module.scss";

interface SaturationProps {
  size: Size;
  hsbColor: HSBColor;
}

const Saturation = ({ size, hsbColor }: SaturationProps) => {
  const [saturation, setSaturation] = useState<number>(hsbColor.saturation);
  const [bright, setBright] = useState<number>(hsbColor.bright);
  const boundingSizeRef = useRef<BoundingSize>({ height: 0, width: 0 });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const boundingClientRect = containerRef.current.getBoundingClientRect();
    const { width, height } = boundingClientRect;
    boundingSizeRef.current = {
      width,
      height,
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

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

  const hueStyle = useMemo<React.CSSProperties>(() => {
    return {
      background: `hsl(${hsbColor.hue},100%, 50%)`,
    };
  }, [hsbColor]);

  const pointerStyle = useMemo<React.CSSProperties>(() => {
    return {
      top: `${-bright * 100 + 100}%`,
      left: `${saturation * 100}%`,
    };
  }, [bright, saturation]);

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
    const { width: containerWidth, height: containerHeight } = boundingSizeRef.current;
    const left = Math.min(Math.max(0, position.x), containerWidth);
    const top = Math.min(Math.max(0, position.y), containerHeight);

    setBright(1 - top / containerHeight);
    setSaturation(left / containerWidth);
  };

  return (
    <div className={styles.container} style={containerStyle} onMouseDown={handleOnMouseDown} ref={containerRef}>
      <div className={styles.hue} style={hueStyle} />
      <div className={styles["white"]} />
      <div className={styles["black"]} />
      <div className={styles.pointer} style={pointerStyle} />
    </div>
  );
};

export default Saturation;
