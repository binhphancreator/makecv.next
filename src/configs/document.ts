import Paper from "~/components/document/paper/Paper";
import PaperBackground from "~/components/document/paper/Background";
import DocumentImage from "~/components/document/Image";
import Text from "~/components/document/text/Text";

export const ComponentName = {
  Paper: "Paper",
  PaperBackground: "PaperBackground",
  DocumentImage: "DocumentImage",
  Text: "Text",
};

export const ComponentMap: {[key: string]: React.FC<any>} = {
  [ComponentName.Paper]: Paper,
  [ComponentName.PaperBackground]: PaperBackground,
  [ComponentName.DocumentImage]: DocumentImage,
  [ComponentName.Text]: Text,
};

export const ShownNameComponents = [
  ComponentName.Paper,
];
