import { SvgProps } from "~/types/app";
import DefaultImage from "./regular/DefaultImage";
import Frame from "./regular/Frame";
import Text from "./regular/Text";
import Shapes from "./regular/Shapes";
import Image from "./regular/Image";

const REGULAR_ICONS_SVG = {
  "default-image": DefaultImage,
  "frame": Frame,
  "text": Text,
  "shapes": Shapes,
  "image": Image,
};

const SOLID_ICONS_SVG = {

};

export type SvgName = keyof typeof REGULAR_ICONS_SVG;
export type SvgType = "regular" | "solid";

export const REGULAR_ICONS = (REGULAR_ICONS_SVG as {[key: string]: React.FC<SvgProps>});
export const SOLID_ICONS = (SOLID_ICONS_SVG as {[key: string]: React.FC<SvgProps>});
