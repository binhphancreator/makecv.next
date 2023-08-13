import { useRef } from "react";
import FormaterMap, { FormatNameProp } from "~/components/document/text/formats";
import { surroundText, surroundLine } from "~/components/document/text/formats/formater";
import { EditorContainerHook } from "~/components/document/text/hooks/container";
import { EditorSelectionHook } from "~/components/document/text/hooks/selection";

export type Alteration = {
  content: string;
  formats?: {
    [key: string]: any;
  };
  breakline?: boolean;
  span: HTMLSpanElement;
};

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

export const useEditorModel = (container: EditorContainerHook, selection: EditorSelectionHook) => {
  const alterationsRef = useRef<Alteration[]>([]);

  const alterations = () => {
    return alterationsRef.current;
  };

  const length = () => {
    return alterationsRef.current.length;
  };

  const first = () => {
    return alterationsRef.current.at(0);
  };

  const last = () => {
    return alterationsRef.current.at(alterationsRef.current.length - 1);
  };

  const indexOf = (alteration: Alteration) => {
    return alterationsRef.current.indexOf(alteration);
  };

  const indexAt = (index: number) => {
    const alteration = alterationsRef.current[index];
    if (!alteration) {
      return undefined;
    }
    return alteration;
  };

  const next = (reference: Alteration) => {
    const index = indexOf(reference);
    return indexAt(index + 1);
  };

  const insertAfter = (alteration: Alteration, reference?: Alteration) => {
    if (reference) {
      return insertBefore(alteration, next(reference));
    } else {
      return insertBefore(alteration);
    }
  };

  const insertBefore = (alteration: Alteration, reference?: Alteration) => {
    const span = alteration.span;
    const index = reference ? indexOf(reference) : alterationsRef.current.length;
    const lastAlteration = last();

    let line = null;

    if (reference) {
      line = lineOf(reference);
      if (line) {
        container.insertSpanBefore(line, span, reference.span);
      }
    } else {
      if (lastAlteration) {
        line = lineOf(lastAlteration);
        if (line) {
          container.insertSpanAfter(line, span, lastAlteration.span);
        }
      } else {
        line = surroundLine(span);
        container.insertLineBeforeAt(line, getLineIndex(index));
      }
    }

    const insertedAlteration = alteration;

    alterationsRef.current = [
      ...alterationsRef.current.slice(0, index),
      insertedAlteration,
      ...alterationsRef.current.slice(index),
    ];

    return insertedAlteration;
  };

  const insertBeforeAt = (alteration: Alteration, index: number) => {
    const reference = indexAt(index);
    return insertBefore(alteration, reference);
  };

  const appendRaw = (rawContent: string, formats?: { [Property in FormatNameProp]?: any }) => {
    const content = rawContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const span = surroundText(content);

    const insertedAlteration = insertBefore({
      content,
      formats,
      span,
    });

    format(insertedAlteration);
  };

  const getLineIndex = (alterationIndex: number) => {
    let lineIndex = 0;

    for (let index = 1; index <= Math.min(alterationIndex, alterationsRef.current.length - 1); index++) {
      if (indexAt(index - 1)?.breakline) {
        lineIndex++;
      }
    }

    return lineIndex;
  };

  const findBySpan = (span: Node) => {
    if (!alterationsRef.current) {
      return null;
    }
    const index = alterationsRef.current.findIndex((alteration) => alteration.span === span);
    if (index >= 0) {
      return indexAt(index);
    }
    return null;
  };

  const seperate = (alteration: Alteration, positions: number[]): Alteration[] => {
    if (!alteration) {
      return [];
    }

    if (!positions.length) {
      return [alteration];
    }

    const content = alteration.content;

    let offsets = [...positions].sort((a, b) => a - b);

    const seperatedAlterations: Alteration[] = [];

    if (offsets[0] > 0) {
      offsets = [0, ...offsets];
    }
    if (offsets[offsets.length - 1] < content.length) {
      offsets = [...offsets, content.length];
    }

    for (let i = 1; i < offsets.length; i++) {
      const offset = offsets[i];
      const prevOffset = offsets[i - 1];
      const subAlteration = sub(alteration, [prevOffset, offset]);
      if (subAlteration) {
        seperatedAlterations.push(subAlteration);
      }
    }

    return seperatedAlterations;
  };

  const seperateAt = (index: number, positions: number[]): Alteration[] => {
    const alteration = indexAt(index);
    if (!alteration) {
      return [];
    }

    return seperate(alteration, positions);
  };

  const sub = (alteration: Alteration, offset: [number, number]): Alteration | null => {
    if (!alteration) {
      return null;
    }

    const [start, end] = offset;
    const content = alteration.content;

    return {
      content: content.substring(start, end),
      formats: alteration.formats,
      span: surroundText(content.substring(start, end)),
    };
  };

  const replace = (alteration: Alteration, replacedValue: Alteration) => {
    if (!alteration || !alteration.span || !replacedValue.span) {
      return;
    }

    container.replaceSpanWith(alteration.span, replacedValue.span);
    Object.assign(alteration, { ...replacedValue });
    return alteration;
  };

  const replaceMany = (alteration: Alteration, replacedValues: Alteration[]) => {
    if (!alteration || !alteration.span || !replacedValues.length) {
      return;
    }

    replace(alteration, replacedValues[0]);
    let prevAlteration = alteration;
    for (let index = 1; index < replacedValues.length; index++) {
      prevAlteration = insertAfter(replacedValues[index], prevAlteration);
    }
  };

  const clear = () => {
    alterationsRef.current = [];
  };

  const mergeFormat = (alteration: Alteration, formats: { [key: string]: any }) => {
    alteration.formats = { ...alteration.formats, ...formats };
    return alteration;
  };

  const lineAt = (index: number) => {
    const alteration = indexAt(index);
    if (alteration) {
      return lineOf(alteration);
    }
  };

  const lineOf = (alteration: Alteration) => {
    if (alteration.span && alteration.span.parentNode) {
      return alteration.span.parentNode;
    }
    return undefined;
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
      mergeFormat(alteration, formats);
    }

    return alteration;
  };

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

    const startAlteration = findBySpan(startSpan);
    const endAlteration = findBySpan(endSpan);

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

  return {
    alterations,
    insertBefore,
    insertBeforeAt,
    insertAfter,
    clear,
    findBySpan,
    indexAt,
    sub,
    replace,
    replaceMany,
    getLineIndex,
    indexOf,
    next,
    first,
    last,
    length,
    seperateAt,
    seperate,
    mergeFormat,
    lineOf,
    lineAt,
    format,
    appendRaw,
    getRangeAlteration,
  };
};

export type EditorModelHook = ReturnType<typeof useEditorModel>;
