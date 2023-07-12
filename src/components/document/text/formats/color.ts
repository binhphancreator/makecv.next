import { surroundText, EditorFormater } from "./formater";

const formatColor: EditorFormater = {
  formatText(text, value) {
    const span = surroundText(text);
    span.style.color = value;
    return span;
  },
  formatSpan(span, value) {
    span.style.color = value;
    return span;
  },
};

export default formatColor;
