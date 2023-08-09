import { useEffect } from "react";
import { useEditorSelection } from "./selection";
import { useEditorContainer } from "./container";
import { useEditorKeyboard } from "./keyboard";
import { Alteration, useEditorModel } from "./model";
import { useDocumentEventListener } from "~/components/document/event/hooks";
import FormaterMap from "~/components/document/text/formats";
import { surroundText } from "~/components/document/text/formats/formater";

export type AlterationRange = {
  start: {
    alteration: Alteration;
    offset: number;
  };
  end: {
    alteration: Alteration;
    offset: number;
  };
  collapsed?: boolean;
};

export const useTextEditor = () => {
  const container = useEditorContainer();
  const selection = useEditorSelection(container);
  const keyboard = useEditorKeyboard(container);
  const model = useEditorModel(container);
  useDocumentEventListener("editor.text.format", (event) => {
    const range = getRangeAlteration();

    if (!range) {
      return;
    }

    if (range.collapsed) {
      const seperatedAlterations = model.seperate(range.start.alteration, [range.start.offset, range.end.offset]);
      if (range.start.offset > 0) {
        format(seperatedAlterations[1], { [event.format]: event.value });
      } else {
        format(seperatedAlterations[0], { [event.format]: event.value });
      }
      model.replaceMany(range.start.alteration, seperatedAlterations);
    }
  });

  useEffect(() => {
    keyboard.listen();
    return () => keyboard.destroy();
  }, []);

  const getRangeAlteration = (): AlterationRange | undefined => {
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

    return {
      start: {
        alteration: startAlteration,
        offset: range.start.offset,
      },
      end: {
        alteration: endAlteration,
        offset: range.end.offset,
      },
      collapsed: startAlteration === endAlteration,
    };
  };

  const getRange = () => {
    return selection.getRange();
  };

  const insertText = (index: number, initialContent: string, formats?: { [key: string]: any }) => {
    const content = initialContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const span = surroundText(content);

    const insertedAlteration = model.insertBeforeAt(
      {
        content,
        formats,
        span,
      },
      index
    );

    format(insertedAlteration);
  };

  const format = (alteration: Alteration, formats?: { [key: string]: any }) => {
    const span = alteration.span;
    if (formats && Object.keys(formats).length) {
      for (const name in formats) {
        const formater = FormaterMap[name];
        const value = formats[name];
        if (!formater) {
          continue;
        }
        formater.formatSpan(span, value);
      }
      model.mergeFormat(alteration, formats);
    }

    return alteration;
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
    format,
    getRangeAlteration,
    getRange,
  };
};
