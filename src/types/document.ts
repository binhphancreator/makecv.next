import React from "react";

export type DataRender = {
  key?: string,
  parentKey?: string,
  name?: string,
  component: string,
  options?: {
    [key: string]: any,
  }
  style?: React.CSSProperties,
  position?: Position,
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

export type Color = string;
