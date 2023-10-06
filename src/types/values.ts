export type AbsoluteSize = {
  width: number;
  height: number;
};

export type AbsolutePosition = {
  x: number;
  y: number;
};

export type RelativePosition = "center" | "left" | "right" | AbsolutePosition;

export type RadiusValue = number | [number, number] | [number, number, number, number];
