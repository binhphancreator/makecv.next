import React, { ForwardedRef, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/app";
import { addEditingKey, removeEditingKey } from "~/redux/documentSlice";
import { Size } from "~/types/document";

interface TextProps {
  size?: Size;
  content: string;
  keyRender: string;
}

interface TextMethods {}

const TextComponent = ({ size, content, keyRender }: TextProps, forwardRef: ForwardedRef<TextMethods>) => {
  const dispatch = useAppDispatch();
  const editingContexts = useAppSelector((state) => state.documentState.editingContexts);

  const editorInputRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(forwardRef, () => ({}));

  useEffect(() => {
    if (editorInputRef.current) {
      editorInputRef.current.innerHTML = `<span>${content}</span>`;
    }
  }, []);

  const editorContainerStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (size) {
      style.width = `${size.width}px`;
      style.height = `${size.height}px`;
    } else {
      style.whiteSpace = "nowrap";
    }
    return style;
  }, [size]);

  const editorCoverStyle = useMemo<React.CSSProperties>(() => {
    return {
      visibility: Object.keys(editingContexts).includes(keyRender) ? "hidden" : "visible",
    };
  }, [editingContexts, keyRender]);

  const handleOnDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(
      addEditingKey({
        key: keyRender,
        context: {
          key: keyRender,
        },
      })
    );
    selectAll();
  };

  const selectAll = () => {
    if (!editorInputRef.current) {
      return null;
    }
    const range = document.createRange();
    range.selectNodeContents(editorInputRef.current);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const handleOnBlur = () => {
    dispatch(removeEditingKey({ key: keyRender }));
  };

  return (
    <div className="editor">
      <div onDoubleClick={handleOnDoubleClick} className="editor-cover" style={editorCoverStyle} />
      <div
        onBlur={handleOnBlur}
        ref={editorInputRef}
        className="editor-input"
        style={editorContainerStyle}
        contentEditable={true}
        spellCheck={false}
      />
    </div>
  );
};

const Text = React.forwardRef<TextMethods, TextProps>(TextComponent);

export default Text;
