import { useRef } from "react";
import { FormatNameProp } from "../formats";

export type ContentAlteration = {
  content: string;
  formats?: {
    name: FormatNameProp;
    value: string;
  }[];
};

export type ContentLine = {
  content: string;
  format?: FormatNameProp;
};

export const useEditorTracker = () => {
  const tracksRef = useRef<ContentAlteration[]>([]);

  const alterations = () => {
    return tracksRef.current;
  };

  const insert = (index: number, alteration: ContentAlteration) => {
    tracksRef.current = [...tracksRef.current.slice(0, index), alteration, ...tracksRef.current.slice(index)];
  };

  const remove = (index: number) => {
    tracksRef.current.splice(index, 1);
  };

  const clear = () => {
    tracksRef.current = [];
  };

  return {
    alterations,
    insert,
    remove,
    clear,
  };
};

export type EditorTrackerHook = ReturnType<typeof useEditorTracker>;
