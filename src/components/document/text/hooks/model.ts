import { useRef } from "react";
import { surroundText } from "~/components/document/text/formats/formater";

export type ContentAlteration = {
  content: string;
  formats?: {
    [key: string]: any;
  };
  span: HTMLSpanElement;
};

export const useEditorModel = () => {
  const alterationsRef = useRef<ContentAlteration[]>([]);

  const alterations = () => {
    return alterationsRef.current;
  };

  const indexAt = (index: number) => {
    return alterationsRef.current[index];
  };

  const insertAlteration = (index: number, alteration: ContentAlteration) => {
    alterationsRef.current = [
      ...alterationsRef.current.slice(0, index),
      { ...alteration },
      ...alterationsRef.current.slice(index),
    ];
  };

  const findBySpan = (span: Node) => {
    if (!alterationsRef.current) {
      return null;
    }
    const index = alterationsRef.current.findIndex((alteration) => alteration.span === span);
    if (index >= 0) {
      return { index, alteration: indexAt(index) };
    }
    return null;
  };

  const subAlteration = (index: number, offset: [number, number]): ContentAlteration | null => {
    const alteration = indexAt(index);
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

  const removeAlteration = (index: number) => {
    alterationsRef.current.splice(index, 1);
  };

  const clear = () => {
    alterationsRef.current = [];
  };

  return {
    alterations,
    insertAlteration,
    removeAlteration,
    clear,
    findBySpan,
    indexAt,
    subAlteration,
  };
};

export type EditorModelHook = ReturnType<typeof useEditorModel>;
