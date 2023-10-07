import { ComponentName } from "~/components/document";
import { ColorValue } from "~/components/color/types";
import { AbsolutePosition, AbsoluteSize } from "~/types/values";

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

export type Position = AbsolutePosition;

export type Size = {
  width?: number;
  height?: number;
};

export type BoundingSize = AbsoluteSize;

export type DocumentColor = ColorValue | string;

export type EditingContext = {
  key: string;
};
