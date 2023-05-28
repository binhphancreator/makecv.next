import React, { ForwardedRef, useEffect, useMemo, useRef } from "react";
import { Size } from "~/types/document";
import type Editor from "quill";

interface TextProps {
  size?: Size;
}
interface TextMethods {}

type FalloraEditor = HTMLDivElement & {
  editor: Editor;
};

const TextComponent = (
  { size }: TextProps,
  forwardRef: ForwardedRef<TextMethods>
) => {
  const editorElementRef = useRef<FalloraEditor>(null);
  React.useImperativeHandle(forwardRef, () => ({}));

  const createEditor = async (element: Element): Promise<Editor> => {
    const EditorNoSSR = (await import("quill")).default;
    const editor = new EditorNoSSR(element, {
      modules: {
        toolbar: false,
      },
      formats: ["font", "color"],
    });
    editor.root.parentElement?.classList?.remove("ql-container");
    editor.root.classList.remove("ql-editor");
    editor.root.parentElement?.querySelector(".ql-clipboard")?.remove();
    return editor;
  };

  const editor = useMemo<Editor | null>(() => {
    if (editorElementRef.current && editorElementRef.current.editor) {
      return editorElementRef.current.editor;
    }
    return null;
  }, [editorElementRef]);

  const editorContainerStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (size) {
      style.width = `${size.width}px`;
      style.height = `${size.height}px`;
    }
    return style;
  }, [size]);

  useEffect(() => {
    if (editorElementRef.current) {
      createEditor(editorElementRef.current).then((_editor) => {
        if (editorElementRef.current) {
          editorElementRef.current.editor = _editor;
        }
      });
    }
  }, []);

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      ref={editorElementRef}
      className="editor"
      style={editorContainerStyle}
    >
      Xin chao the gioi
    </div>
  );
};

const Text = React.forwardRef<TextMethods, TextProps>(TextComponent);

export default Text;
