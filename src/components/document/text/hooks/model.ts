import { useRef } from "react";
import { EditorContainerHook } from "~/components/document/text/hooks/container";
import { EditorSelectionHook } from "~/components/document/text/hooks/selection";
import FormaterMap, { FormatNameProp } from "~/components/document/text/formats";
import { Alteration, AlterationRange } from "~/components/document/text/types/model";

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
    const node = alteration.node;
    const index = reference ? indexOf(reference) : alterationsRef.current.length;
    const beforeAlteration = indexAt(index - 1);
    const lastAlteration = last();

    if (isEmpty()) {
      alteration.breakline = true;
    }

    alterationsRef.current = [
      ...alterationsRef.current.slice(0, index),
      alteration,
      ...alterationsRef.current.slice(index),
    ];

    if (alteration.breakline) {
      const line = container.createLine();
      const nextAlterationsSameLine = getNextAlterationsSameLineWith(alteration);
      if (nextAlterationsSameLine.length) {
        nextAlterationsSameLine.forEach((alterationSameLine) => {
          container.appendTextNode(line, alterationSameLine.node);
        });
      }
      container.insertLineBefore(line, reference ? lineOf(reference) : undefined);
    } else if (beforeAlteration) {
      const line = lineAt(index - 1);
      if (line) {
        container.insertTextNodeAfter(line, node, beforeAlteration.node);
      }
    } else if (lastAlteration) {
      const line = lineOf(lastAlteration);
      if (line) {
        container.insertTextNodeAfter(line, node, lastAlteration.node);
      }
    }

    return alteration;
  };

  const insertBeforeAt = (alteration: Alteration, index: number) => {
    const reference = indexAt(index);
    return insertBefore(alteration, reference);
  };

  const appendRaw = (rawContent: string, formats?: { [Property in FormatNameProp]?: any }) => {
    const content = rawContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const node = container.surroundText(content);

    const insertedAlteration = insertBefore({
      content,
      formats,
      node,
      breakline: isEmpty() ? true : false,
    });

    format(insertedAlteration);
  };

  const getLineIndex = (alterationIndex: number) => {
    let lineIndex = -1;

    for (let index = 0; index <= Math.min(alterationIndex, alterationsRef.current.length - 1); index++) {
      if (indexAt(index)?.breakline) {
        lineIndex++;
      }
    }

    return lineIndex;
  };

  const getNextAlterationsSameLineWith = (reference: Alteration): Alteration[] => {
    let startIndex = indexOf(reference);

    if (startIndex < 0) {
      return [];
    }

    const alterationsSameLine: Alteration[] = [reference];

    while (++startIndex < alterationsRef.current.length) {
      if (alterationsRef.current[startIndex].breakline) {
        break;
      }
      alterationsSameLine.push(alterationsRef.current[startIndex]);
    }

    return alterationsSameLine;
  };

  const findBySpan = (node: Node) => {
    if (!alterationsRef.current) {
      return null;
    }
    const index = alterationsRef.current.findIndex((alteration) => alteration.node === node);
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

    return format(
      {
        content: content.substring(start, end),
        formats: alteration.formats,
        node: container.surroundText(content.substring(start, end)),
      },
      alteration.formats
    );
  };

  const replace = (alteration: Alteration, replacedValue: Alteration) => {
    const index = indexOf(alteration);

    if (index < 0) {
      return;
    }

    container.replaceTextNodeWith(alteration.node, replacedValue.node);
    Object.assign(alteration, { ...replacedValue });
    return alteration;
  };

  const replaceMany = (alteration: Alteration, replacedValues: Alteration[]) => {
    if (!alteration || !alteration.node || !replacedValues.length) {
      return;
    }

    let prevAlteration = replace(alteration, replacedValues[0]);
    for (let index = 1; index < replacedValues.length; index++) {
      prevAlteration = insertAfter(replacedValues[index], prevAlteration);
    }
  };

  const clear = () => {
    alterationsRef.current = [];
  };

  const lineAt = (index: number) => {
    const alteration = indexAt(index);
    if (alteration) {
      return lineOf(alteration);
    }
  };

  const lineOf = (alteration: Alteration) => {
    if (alteration.node && alteration.node.parentNode) {
      return alteration.node.parentNode;
    }
    return undefined;
  };

  const mergeFormat = (alteration: Alteration, formats: { [key: string]: any }) => {
    alteration.formats = { ...alteration.formats, ...formats };
    return alteration;
  };

  const format = (alteration: Alteration, formats?: { [key: string]: any }) => {
    const node = alteration.node;
    if (formats && Object.keys(formats).length) {
      for (const name in formats) {
        const formater = FormaterMap[name];
        const value = formats[name];
        if (!formater) {
          continue;
        }
        formater.formatSpan(node, value);
      }
      mergeFormat(alteration, formats);
    }

    return alteration;
  };

  const formatAt = (index: number, formats?: { [key: string]: any }) => {
    const alteration = indexAt(index);
    if (!alteration) {
      return;
    }
    return format(alteration, formats);
  };

  const getRangeAlteration = (): AlterationRange | undefined => {
    const range = selection.getRange();
    if (!range) {
      return;
    }

    const startSpan = container.findAlterationNode(range.start.node);
    const endSpan = container.findAlterationNode(range.end.node);

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
        index: indexOf(startAlteration),
      },
      end: {
        alteration: endAlteration,
        offset: range.end.offset,
        index: indexOf(endAlteration),
      },
      collapsed: startAlteration === endAlteration && startAlteration === endAlteration,
    };
  };

  const breakLine = (alteration: Alteration) => {
    const index = indexOf(alteration);
    if (index < 0) {
      return;
    }
    const afterLineIndex = getLineIndex(index) + 1;
    const line = container.createLine();

    const nextAlterationsSameLine = getNextAlterationsSameLineWith(alteration);
    nextAlterationsSameLine.forEach((alterationSameLine) => container.appendTextNode(line, alterationSameLine.node));

    container.insertLineBeforeAt(line, afterLineIndex);

    Object.assign(alteration, { breakLine: true });
    return alteration;
  };

  const syncContent = (alteration: Alteration) => {
    const index = indexOf(alteration);
    if (index < 0) {
      return;
    }
    alteration.content = alteration.node.innerText;
  };

  const isEmpty = () => {
    return !alterationsRef.current.length;
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
    getNextAlterationsSameLineWith,
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
    formatAt,
    appendRaw,
    getRangeAlteration,
    isEmpty,
    breakLine,
    syncContent,
  };
};

export type EditorModelHook = ReturnType<typeof useEditorModel>;
