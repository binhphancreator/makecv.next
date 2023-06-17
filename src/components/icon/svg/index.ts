import { SvgProps } from "~/types/app";
import DefaultImage from "./regular/DefaultImage";
import Frame from "./regular/Frame";
import Text from "./regular/Text";
import Shapes from "./regular/Shapes";
import Image from "./regular/Image";

const IconsMap = {
  regular: {
    "default-image": DefaultImage,
    frame: Frame,
    text: Text,
    shapes: Shapes,
    image: Image,
  },
  solid: {},
};

export type SvgName =
  | keyof typeof IconsMap.regular
  | keyof typeof IconsMap.solid;
export type SvgType = keyof typeof IconsMap;

export default IconsMap as {
  [key: string]: { [key: string]: React.FC<SvgProps> };
};
