import Paper from "~/components/document/paper/Paper";
import Image from "~/components/document/image/Image";
import Text from "~/components/document/text/Text";
import Shape from "~/components/document/shape/Shape";
import { SvgName } from "~/components/icon/svg";

export const ComponentNameMap = {
  Paper: "Paper",
  Image: "Image",
  Text: "Text",
  Shape: "Shape",
};

export const ComponentMap: { [key: string]: React.FC<any> } = {
  [ComponentNameMap.Paper]: Paper,
  [ComponentNameMap.Image]: Image,
  [ComponentNameMap.Text]: Text,
  [ComponentNameMap.Shape]: Shape,
};

export const ComponentIconMap: { [key: string]: SvgName } = {
  [ComponentNameMap.Paper]: "frame",
  [ComponentNameMap.Text]: "text",
  [ComponentNameMap.Image]: "image",
  [ComponentNameMap.Shape]: "shapes",
  default: "shapes",
};

export const ShownNameComponents = [ComponentNameMap.Paper];

export type ComponentName = keyof typeof ComponentNameMap;
