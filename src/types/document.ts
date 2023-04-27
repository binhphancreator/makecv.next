import React from "react";

export type DataRender = {
  component: string,
  options?: {
    [key: string]: object,
  }
  style?: React.CSSProperties,
  position?: "center" | Position,
  size?: Size,
  children?: DataRender[],
}

export type Position = {
  x: number,
  y: number,
}

export type Size = {
  width: number,
  height: number,
}
