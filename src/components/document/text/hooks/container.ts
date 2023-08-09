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

  const insertLineBefore = (line: HTMLParagraphElement, reference?: Node) => {
    if (!ref.current) {
      return;
    }
    ref.current.insertBefore(line, reference || null);
  };

  const insertLineBeforeAt = (line: HTMLParagraphElement, index: number) => {
    if (!ref.current) {
      return;
    }
    const reference = ref.current.childNodes[index] ?? null;
    ref.current.insertBefore(line, reference);
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

  const insertSpanAfter = (line: Node, span: Node, reference?: Node) => {
    if (!ref.current || !line) {
      return;
    }
    const index = Array.prototype.indexOf.call(line.childNodes, reference);
    if (index >= 0) {
      insertSpanBefore(line, span, line.childNodes.item(index + 1));
    } else {
      line.appendChild(span);
    }
  };

  const insertSpanBefore = (line: Node, span: Node, reference?: Node) => {
    if (!ref.current) {
      return;
    }
    line.insertBefore(span, reference || null);
  };

  const insertSpanBeforeAt = (line: Node, span: Node, index: number) => {
    if (!ref.current) {
      return;
    }

    if (!line) {
      return;
    }

    const reference = line.childNodes.item(index);

    insertSpanBefore(line, span, reference);
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

  const replaceSpanWith = (span: HTMLSpanElement, replaced: Node) => {
    if (span !== replaced) {
      span.replaceWith(replaced);
    }
  };

  const getIndexSpanOfLine = (span: HTMLSpanElement) => {
    const line = span.parentNode;
    if (!line) {
      return -1;
    }
    return Array.prototype.indexOf.call(line.childNodes, span);
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
    insertLineBefore,
    insertLineBeforeAt,
    insertSpanAfter,
    removeLine,
    clear,
    findSpan,
    replaceSpanWith,
    insertSpanBeforeAt,
    insertSpanBefore,
    getIndexSpanOfLine,
  };
};

export type EditorContainerHook = ReturnType<typeof useEditorContainer>;
