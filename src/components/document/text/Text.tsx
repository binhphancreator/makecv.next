import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/app";
import { addEditingKey, removeEditingKey } from "~/redux/documentSlice";
import { Size } from "~/types/document";
import { useTextEditor } from "./hooks/editor";
import styles from "@/components/document/editor.module.scss";

interface TextProps {
  size?: Size;
  content: string;
  keyRender: string;
}

export interface TextMethods {}

const TextComponent = ({ size, content, keyRender }: TextProps) => {
  const dispatch = useAppDispatch();
  const editingContexts = useAppSelector((state) => state.documentState.editingContexts);

  const editor = useTextEditor();

  useEffect(() => {
    editor.empty();
    editor.insertText(0, {
      content,
    });
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
    editor.focus(true);
  };

  const handleOnBlur = () => {
    dispatch(removeEditingKey({ key: keyRender }));
  };

  return (
    <div className={styles.editor}>
      <div onDoubleClick={handleOnDoubleClick} className={styles["editor-cover"]} style={editorCoverStyle} />
      <div
        onBlur={handleOnBlur}
        ref={editor.ref}
        className={styles["editor-input"]}
        style={editorContainerStyle}
        contentEditable={true}
        spellCheck={false}
      />
    </div>
  );
};

const Text = TextComponent;

export default Text;
