import { EditorContainerHook } from "./container";

export type NativeRange = Range;

export interface RangePosition {
  node: Node;
  offset: number;
}

export interface NormalizedRange {
  start: RangePosition;
  end: RangePosition;
  native: NativeRange;
  collapsed?: boolean;
}

export const useEditorSelection = (container: EditorContainerHook) => {
  const getRange = () => {
    const nativeRange = getNativeRange();
    if (!nativeRange) {
      return null;
    }
    const range = normalizeNative(nativeRange);
    return range;
  };

  const getNativeRange = () => {
    if (!globalThis.window) {
      return null;
    }
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      return null;
    }
    const nativeRange = selection.getRangeAt(0);
    return nativeRange;
  };

  const normalizeNative = (nativeRange: NativeRange): NormalizedRange | null => {
    const range: NormalizedRange = {
      start: {
        node: nativeRange.startContainer,
        offset: nativeRange.startOffset,
      },
      end: { node: nativeRange.endContainer, offset: nativeRange.endOffset },
      native: nativeRange,
      collapsed: nativeRange.collapsed,
    };

    range.start = walkRangePosition(range.start);
    range.end = walkRangePosition(range.end);

    return range;
  };

  const walkRangePosition = (position: RangePosition): RangePosition => {
    let { node, offset } = position;
    while (!(node instanceof Text) && node.childNodes.length > 0) {
      if (node.childNodes.length > offset) {
        node = node.childNodes[offset];
        offset = 0;
      } else if (node.childNodes.length === offset) {
        node = node.childNodes[node.childNodes.length - 1];
        if (node instanceof Text) {
          offset = node.data.length;
        } else if (node.childNodes.length > 0) {
          offset = node.childNodes.length;
        } else {
          offset = node.childNodes.length + 1;
        }
      } else {
        break;
      }
    }
    position.node = node;
    position.offset = offset;
    return position;
  };

  const focus = () => {
    if (!container.ref.current) {
      return;
    }
    container.ref.current.focus({ preventScroll: true });
  };

  const selectAll = () => {
    if (!container.ref.current) {
      return null;
    }
    const range = document.createRange();
    range.selectNodeContents(container.ref.current);
    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return {
    getRange,
    getNativeRange,
    focus,
    selectAll,
  };
};
