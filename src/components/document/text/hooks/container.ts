import { useRef } from "react";
import { AlterationNode, AlterationNodeType } from "~/components/document/text/types/model";

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

  const insertTextNodeAfter = (line: Node, span: Node, reference?: Node) => {
    if (!ref.current || !line) {
      return;
    }
    const index = Array.prototype.indexOf.call(line.childNodes, reference);
    if (index >= 0) {
      insertTextNodeBefore(line, span, line.childNodes.item(index + 1));
    } else {
      line.appendChild(span);
    }
  };

  const insertTextNodeBefore = (line: Node, span: Node, reference?: Node) => {
    if (!ref.current) {
      return;
    }

    if (reference && !line.contains(reference)) {
      return;
    }

    line.insertBefore(span, reference || null);
  };

  const insertTextNodeBeforeAt = (line: Node, span: Node, index: number) => {
    if (!ref.current) {
      return;
    }

    if (!line) {
      return;
    }

    const reference = line.childNodes.item(index);

    insertTextNodeBefore(line, span, reference);
  };

  const appendTextNode = (line: Node, span: Node) => {
    line.appendChild(span);
  };

  const findAlterationNode = (node: Node): Node | null => {
    const parentNode = node?.parentNode;

    if (!parentNode) {
      return null;
    }

    if (parentNode.nodeName.toLocaleLowerCase() === "p") {
      return node;
    }

    return findAlterationNode(node.parentNode);
  };

  const replaceTextNodeWith = (node: AlterationNode, replaced: Node) => {
    if (node !== replaced) {
      node.replaceWith(replaced);
    }
  };

  const getIndexAlterationNodeOfLine = (node: AlterationNode) => {
    const line = node.parentNode;
    if (!line) {
      return -1;
    }
    return Array.prototype.indexOf.call(line.childNodes, node);
  };

  const createLine = () => {
    return document.createElement("p");
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

  const removeTextNode = (node: AlterationNode) => {
    const line = node.parentElement;
    node.remove();
    if (line && line.childNodes.length <= 1) {
      line.remove();
    } else {
      node.remove();
    }
  };

  const surroundText = (text: string): AlterationNode => {
    if (!text || !text.length) {
      const br = document.createElement("br");
      return br;
    } else {
      const span = document.createElement("span");
      span.innerText = text;
      return span;
    }
  };

  const createSpan = (text: string): HTMLSpanElement => {
    const span = document.createElement("span");
    span.innerText = text;
    return span;
  };

  const getAlterationNodeType = (node: AlterationNode): AlterationNodeType | undefined => {
    if (!node || !node.nodeName) {
      return;
    }

    if (node.nodeName.toLowerCase() === "span") {
      return "span";
    }

    if (node.nodeName.toLowerCase() === "br") {
      return "br";
    }

    return "text";
  };

  const findTextNode = (node: Node): Node | null | undefined => {
    if (!node || !node.nodeName) {
      return;
    }

    if (node.nodeName.toString() === "#text") {
      return node;
    }

    const child = node.childNodes[0];

    if (child) {
      return findTextNode(child);
    }
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
    insertTextNodeAfter,
    removeLine,
    clear,
    findAlterationNode,
    replaceTextNodeWith,
    insertTextNodeBeforeAt,
    insertTextNodeBefore,
    appendTextNode,
    createLine,
    getIndexAlterationNodeOfLine,
    removeTextNode,
    surroundText,
    createSpan,
    getAlterationNodeType,
    findTextNode,
  };
};

export type EditorContainerHook = ReturnType<typeof useEditorContainer>;
