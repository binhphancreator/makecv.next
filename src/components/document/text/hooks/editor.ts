import { useEditorSelection } from "./selection";
import { useEditorContainer } from "./container";
import { useEditorKeyboard } from "./keyboard";
import { useEffect } from "react";
import { ContentAlteration, useEditorTracker } from "./tracker";
import FormaterMap from "../formats";
import { surroundLine, surroundText } from "../formats/formater";

export const useTextEditor = () => {
  const container = useEditorContainer();
  const selection = useEditorSelection(container);
  const keyboard = useEditorKeyboard(container);
  const tracker = useEditorTracker();

  useEffect(() => {
    keyboard.listen();
    return () => keyboard.destroy();
  }, []);

  const insertText = (index: number, alteration: ContentAlteration) => {
    const { content, formats } = alteration;
    const span = surroundText(content);

    if (formats && formats.length) {
      for (const format of formats) {
        const formater = FormaterMap[format.name];
        const value = format.value;
        if (!formater) {
          continue;
        }
        formater.formatSpan(span, value);
      }
    }

    const line = surroundLine(span);

    container.insertLine(index, line);
    tracker.insert(index, alteration);
  };

  const empty = () => {
    tracker.clear();
    container.clear();
  };

  const focus = (select?: boolean) => {
    container.ref.current?.focus();
    if (select) {
      selection.selectAll();
    }
  };

  return {
    ref: container.ref,
    insertText,
    empty,
    focus,
  };
};
