export interface EditorFormater {
  formatText(text: string, value: string): HTMLSpanElement;
  formatSpan(span: HTMLSpanElement, value: string): HTMLSpanElement;
}

export const surroundText = (text: string): HTMLSpanElement => {
  const span = document.createElement("span");
  span.innerText = text;

  return span;
};

export const surroundLine = (...spans: HTMLSpanElement[]): HTMLParagraphElement => {
  const line = document.createElement("p");
  line.append(...spans);
  return line;
};
