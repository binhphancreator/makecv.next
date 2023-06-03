import DefaultImage from "./DefaultImage";
import { SvgProps } from "~/types/app";

const SVG_MAP: {[key: string]: React.FC<SvgProps>} = {
  "default-image": DefaultImage,
};

export default SVG_MAP;
