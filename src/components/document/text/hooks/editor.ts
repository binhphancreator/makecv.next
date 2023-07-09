import { useEditorSelection } from "./selection";
import { useEditorContainer } from "./container";
import { useEditorKeyboard } from "./keyboard";
import { useEffect } from "react";

export const useTextEditor = () => {
  const container = useEditorContainer();
  const selection = useEditorSelection(container);
  const keyboard = useEditorKeyboard(container);

  useEffect(() => {
    keyboard.listen();
    return () => keyboard.destroy();
  }, []);

  const getSelection = () => {};

  return {
    editorRef: container.ref,
    selection,
    getSelection,
  };
};
