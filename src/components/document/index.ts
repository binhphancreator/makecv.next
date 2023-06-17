import Paper from "~/components/document/paper/Paper";
import PaperBackground from "~/components/document/paper/Background";
import DocumentImage from "~/components/document/image/Image";
import Text from "~/components/document/text/Text";
import Shape from "~/components/document/paper/shape/Shape";
import { SvgName } from "~/components/icon/svg";

export const ComponentName = {
  Paper: "Paper",
  PaperBackground: "PaperBackground",
  DocumentImage: "DocumentImage",
  Text: "Text",
  Shape: "Shape",
};

export const ComponentMap: { [key: string]: React.FC<any> } = {
  [ComponentName.Paper]: Paper,
  [ComponentName.PaperBackground]: PaperBackground,
  [ComponentName.DocumentImage]: DocumentImage,
  [ComponentName.Text]: Text,
  [ComponentName.Shape]: Shape,
};

export const ComponentIconMap: { [key: string]: SvgName } = {
  [ComponentName.Paper]: "frame",
  [ComponentName.Text]: "text",
  [ComponentName.DocumentImage]: "image",
  [ComponentName.Shape]: "shapes",
  default: "shapes",
};

export const ShownNameComponents = [ComponentName.Paper];
