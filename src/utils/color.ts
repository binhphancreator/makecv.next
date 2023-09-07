import Color from "color";
import { ColorValue, HSBColor, HSVColor, RGBColor } from "~/components/color/types";
import { HSLColor } from "../components/color/types/index";

export const raw2hsb = (raw: string): HSBColor => {
  const color = Color(raw);
  const hsv = color.hsv().object();

  return {
    hue: hsv.h,
    saturation: hsv.s / 100,
    bright: hsv.v / 100,
    alpha: hsv.alpha,
  };
};

export const raw2 = (raw: string): Color => {
  const color = Color(raw);
  return color.rgb();
};

export const hsb2 = (hsb: HSBColor): Color => {
  const color = Color.hsv(hsb.hue, hsb.saturation * 100, hsb.bright * 100).alpha(hsb.alpha ?? 1);
  return color.rgb();
};

export const hsv2 = (hsv: HSVColor): Color => {
  const color = Color.hsv(hsv.hue, hsv.saturation * 100, hsv.value * 100).alpha(hsv.alpha ?? 1);
  return color.rgb();
};

export const hsl2 = (hsl: HSLColor): Color => {
  const color = Color.hsl(hsl.hue, hsl.saturation * 100, hsl.light * 100).alpha(hsl.alpha ?? 1);
  return color.rgb();
};

export const rgb2 = (rgb: RGBColor): Color => {
  const color = Color.hsl(rgb.red, rgb.green, rgb.blue).alpha(rgb.alpha ?? 1);
  return color.rgb();
};

export const color2 = (value: ColorValue): Color => {
  if (typeof value === "string") {
    return raw2(value);
  }

  if (typeof value === "object") {
    if ("hue" in value && "saturation" in value && "bright" in value) {
      return hsb2(value);
    }
    if ("hue" in value && "saturation" in value && "value" in value) {
      return hsv2(value);
    }
    if ("hue" in value && "saturation" in value && "light" in value) {
      return hsl2(value);
    }
    if ("red" in value && "green" in value && "blue" in value) {
      return rgb2(value);
    }
  }

  return Color.rgb(0, 0, 0);
};

export const color2css = (value: ColorValue): string => {
  return color2(value).toString();
};

export const color2hex = (value: ColorValue): string => {
  return color2(value).hex().toString();
};

export const color2hsb = (value: ColorValue): HSBColor => {
  const hsv = color2(value).hsv().object();

  return {
    hue: hsv.h,
    saturation: hsv.s / 100,
    bright: hsv.v / 100,
    alpha: hsv.alpha,
  };
};
