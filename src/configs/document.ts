import Paper from "~/components/document/paper/Paper";
import PaperBackground from "~/components/document/paper/Background";
import DocumentImage from "~/components/document/Image";
import Text from "~/components/document/text/Text";

export const ComponentMap: {[key: string]: React.FC<any>} = {
  "Paper": Paper,
  "PaperBackground": PaperBackground,
  "DocumentImage": DocumentImage,
  "Text": Text,
};
