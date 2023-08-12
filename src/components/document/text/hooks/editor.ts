import { useEffect } from "react";
import { useEditorSelection } from "./selection";
import { useEditorContainer } from "./container";
import { useEditorKeyboard } from "./keyboard";
import { Alteration, useEditorModel } from "./model";
import { FormatNameProp } from "~/components/document/text/formats";

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

  const appendText = (content: string, formats?: { [Property in FormatNameProp]?: any }) => {
    model.appendRaw(content, formats);
  };

  const format = (formats?: { [Property in FormatNameProp]?: any }) => {
    const range = getRangeAlteration();

    if (!range) {
      return;
    }

    if (range.collapsed) {
      const seperatedAlterations = model.seperate(range.start.alteration, [range.start.offset, range.end.offset]);
      if (range.start.offset > 0) {
        model.format(seperatedAlterations[1], formats);
      } else {
        model.format(seperatedAlterations[0], formats);
      }
      model.replaceMany(range.start.alteration, seperatedAlterations);
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
    appendText,
    empty,
    focus,
    getRangeAlteration,
    getRange,
    format,
  };
};
