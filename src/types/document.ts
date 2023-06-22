import React from "react";

export type TemplateDataRender = {
  key?: string;
  parentKey?: string;
  name?: string;
  component: string;
  options?: {
    [key: string]: any;
  };
  style?: React.CSSProperties;
  position?: Position;
  size?: Size;
  children?: TemplateDataRender[];
};

export type DataRender = TemplateDataRender & {
  key: string;
  children?: DataRender[];
};

export type FlatMapDataRender = {
  [key: string]: DataRender;
};

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Color = string;

export type VectorProps = {
  size: Size;
  radius?: number | number[];
  fill: Color;
};
