import { ComponentName } from "~/components/document";
import { ColorValue } from "~/components/color/types";

export type TemplateDataRender = {
  key?: string;
  parentKey?: string;
  name?: string;
  component: ComponentName;
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
  boundingSize?: BoundingSize;
  children?: DataRender[];
  position: Position;
};

export type FlatMapDataRender = {
  [key: string]: DataRender;
};

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width?: number;
  height?: number;
};

export type BoundingSize = {
  width: number;
  height: number;
};

export type DocumentColor = ColorValue | string;

export type VectorProps = {
  size: Size;
  radius?: number | number[];
  fill: DocumentColor;
};

export type EditingContext = {
  key: string;
};
