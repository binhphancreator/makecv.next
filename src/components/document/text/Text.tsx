import React, { ForwardedRef, useEffect, useMemo, useRef } from "react";
import { Size } from "~/types/document";
import type Editor from "quill";

interface TextProps {
  size?: Size;
  content: string;
}
interface TextMethods {}

type FalloraEditor = HTMLDivElement & {
  editor: Editor;
};

const TextComponent = (
  { size, content }: TextProps,
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
    } else {
      style.width = "max-content";
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
  }, [editorElementRef.current]);

  return (
    <div ref={editorElementRef} className="editor" style={editorContainerStyle}>
      {content}
    </div>
  );
};

const Text = React.forwardRef<TextMethods, TextProps>(TextComponent);

export default Text;
