import { useEffect } from "react";
import { useEditorSelection } from "./selection";
import { useEditorContainer } from "./container";
import { useEditorKeyboard } from "./keyboard";
import { useEditorModel } from "./model";
import { useDocumentEventListener } from "~/components/document/event/hooks";
import FormaterMap from "~/components/document/text/formats";
import { surroundLine, surroundText } from "~/components/document/text/formats/formater";

export const useTextEditor = () => {
  const container = useEditorContainer();
  const selection = useEditorSelection(container);
  const keyboard = useEditorKeyboard(container);
  const model = useEditorModel();
  useDocumentEventListener("editor.text.format", (event) => {
    const range = selection.getRange();
    if (!range || range.collapsed) {
      return;
    }

    const startSpan = container.findSpan(range.start.node);
    const endSpan = container.findSpan(range.end.node);

    if (!startSpan || !endSpan) {
      return;
    }

    const startAlteration = model.findBySpan(startSpan);
    const endAlteration = model.findBySpan(endSpan);

    if (!startAlteration || !endAlteration) {
      return;
    }

    if (startAlteration.index === endAlteration.index) {
      const subAlteration = model.subAlteration(startAlteration.index, [range.start.offset, range.end.offset]);
    }
  });

  useEffect(() => {
    keyboard.listen();
    return () => keyboard.destroy();
  }, []);

  const insertText = (index: number, initialContent: string, formats?: { [key: string]: any }) => {
    const content = initialContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const span = surroundText(content);

    formatSpan(span, formats);

    const line = surroundLine(span);

    model.insertAlteration(index, {
      content,
      formats,
      span,
    });

    container.insertLine(index, line);
  };

  const formatSpan = (span: HTMLSpanElement, formats?: { [key: string]: any }) => {
    if (formats && Object.keys(formats).length) {
      for (const name in formats) {
        const formater = FormaterMap[name];
        const value = formats[name];
        if (!formater) {
          continue;
        }
        formater.formatSpan(span, value);
      }
    }
  };

  const empty = () => {
    model.clear();
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
    formatSpan,
  };
};
