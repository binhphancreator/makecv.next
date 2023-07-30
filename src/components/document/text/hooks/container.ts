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

  const insertLine = (index: number, line: HTMLParagraphElement) => {
    if (!ref.current) {
      return;
    }
    const afterNode = ref.current.childNodes[index] ?? null;
    ref.current.insertBefore(line, afterNode);
  };

  const removeLine = (index: number) => {
    if (!ref.current) {
      return;
    }
    const node = ref.current.childNodes[index];
    if (!node) {
      return;
    }
    ref.current.removeChild(node);
  };

  const findSpan = (node: Node): Node | null => {
    if (node.nodeName?.toLowerCase() === "span") {
      return node;
    }

    if (!node.parentNode) {
      return null;
    }

    if (node.parentNode?.nodeName?.toLowerCase() === "span") {
      return node.parentNode;
    }

    return findSpan(node.parentNode);
  };

  const clear = () => {
    if (!ref.current) {
      return;
    }
    ref.current.innerHTML = "";
  };

  return {
    ref,
    on,
    removeListener,
    insertLine,
    removeLine,
    clear,
    findSpan,
  };
};

export type EditorContainerHook = ReturnType<typeof useEditorContainer>;
