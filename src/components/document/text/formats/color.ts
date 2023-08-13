import { EditorFormater } from "~/components/document/text/types/formater";

const formatColor: EditorFormater = {
  formatSpan(span, value) {
    span.style.color = value;
    return span;
  },
};

export default formatColor;
