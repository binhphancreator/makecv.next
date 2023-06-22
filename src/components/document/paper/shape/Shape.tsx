import React, { useMemo } from "react";
import { VectorProps } from "~/types/document";
import VECTOR_MAP, { VectorName } from "./vectors";
import { useAppSelector } from "~/hook";
import { findColor } from "~/utils/document";

type ShapeProps = VectorProps & {
  vector: VectorName;
};

const Shape = ({ vector, size, radius, fill }: ShapeProps) => {
  const colorPaletes = useAppSelector((state) => state.documentState.colorPalettes);

  const fillColor = useMemo<string>(() => {
    return findColor(fill, colorPaletes);
  }, [fill, colorPaletes]);

  const VectorComponent = VECTOR_MAP[vector];

  if (!VectorComponent) {
    return null;
  }

  return (
    <div className="shape">
      <VectorComponent size={size} fill={fillColor} radius={radius} />
    </div>
  );
};

export default Shape;
