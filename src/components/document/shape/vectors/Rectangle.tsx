import React, { useMemo } from "react";
import { VectorProps } from "~/types/document";

const Rectangle = ({ size, radius: initialRadius, fill }: VectorProps) => {
  const { width, height } = size;

  const radius = useMemo<number>(() => {
    if (!initialRadius) {
      return 0;
    }

    if (typeof initialRadius === "number") {
      return initialRadius;
    }

    return initialRadius[0];
  }, [initialRadius]);

  const path = `
    M${radius},${0}
    L${width - radius},${0}
    Q${width},${0}
    ${width},${radius}
    L${width},${height - radius}
    Q${width},${height}
    ${width - radius},${height}
    L${radius},${height}
    Q${0},${height}
    ${0},${height - radius}
    L${0},${radius}
    Q${0},${0}
    ${radius},${0}
    Z
  `;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <path d={path.trim()} fill={fill} />
    </svg>
  );
};

export default Rectangle;
