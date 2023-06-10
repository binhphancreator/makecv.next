import { SvgProps } from "~/types/app";
import DefaultImage from "./DefaultImage";
import Frame from "./Frame";
import Text from "./Text";
import Shapes from "./Shapes";
import Image from "./Image";

const SVG_MAP = {
  "default-image": DefaultImage,
  "frame": Frame,
  "text": Text,
  "shapes": Shapes,
  "image": Image,
};

export type SvgName = keyof (typeof SVG_MAP);

export default (SVG_MAP as {[key: string]: React.FC<SvgProps>});
