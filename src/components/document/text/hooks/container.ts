import { useRef } from "react";

export type TextContainerEventMap = HTMLElementEventMap;

export const useEditorContainer = () => {
  const ref = useRef<HTMLDivElement>(null);

  const on = <K extends keyof TextContainerEventMap>(
    type: K,
    listener: (event: TextContainerEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) => {
    if (!ref.current) {
      return;
    }

    ref.current.addEventListener(type, listener, options);
  };

  const removeListener = <K extends keyof TextContainerEventMap>(
    type: K,
    listener: (event: TextContainerEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) => {
    if (!ref.current) {
      return;
    }

    ref.current.removeEventListener(type, listener, options);
  };

  return {
    ref,
    on,
    removeListener,
  };
};

export type EditorContainerHook = ReturnType<typeof useEditorContainer>;
