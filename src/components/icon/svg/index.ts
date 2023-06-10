import { SvgProps } from "~/types/app";
import DefaultImage from "./DefaultImage";
import Frame from "./Frame";
import Text from "./Text";
import Shapes from "./Shapes";
import Image from "./Image";

const SVG_MAP: {[key: string]: React.FC<SvgProps>} = {
  "default-image": DefaultImage,
  "frame": Frame,
  "text": Text,
  "shapes": Shapes,
  "image": Image,
};

export default SVG_MAP;
