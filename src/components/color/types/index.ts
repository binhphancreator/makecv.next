export type HSBColor = {
  hue: number;
  saturation: number;
  bright: number;
  alpha?: number;
};

export type HSVColor = {
  hue: number;
  saturation: number;
  value: number;
  alpha?: number;
};

export type HSLColor = {
  hue: number;
  saturation: number;
  light: number;
  alpha?: number;
};

export type RGBColor = {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
};

export type HexColor = string;

export type NameColor = string;

export interface ColorModelMapValue {
  hsb: HSBColor;
  hsv: HSVColor;
  hsl: HSLColor;
  rgb: RGBColor;
  hex: HexColor;
  name: NameColor;
}

export type ColorModel = "hsb" | "hsv" | "hsl" | "rgb" | "hex" | "name";

export type ColorValue = HSBColor | HSVColor | HSLColor | RGBColor | HexColor | NameColor;
