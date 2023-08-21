import Color from "color";
import { HSBColor } from "~/components/color/types";

export const toHSB = (raw: string): HSBColor => {
  const color = Color(raw);
  const hsv = color.hsv().object();

  return {
    hue: hsv.h,
    saturation: hsv.s / 100,
    bright: hsv.v / 100,
    alpha: hsv.alpha,
  };
};
