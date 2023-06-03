import React, { ForwardedRef, useMemo, useRef } from "react";
import { Size } from "~/types/document";

interface TextProps {
  size?: Size;
  content: string;
}

interface TextMethods {}

const TextComponent = (
  { size, content }: TextProps,
  forwardRef: ForwardedRef<TextMethods>
) => {
  const editorElementRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(forwardRef, () => ({}));

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

  return (
    <div ref={editorElementRef} className="editor" style={editorContainerStyle}>
      {content}
    </div>
  );
};

const Text = React.forwardRef<TextMethods, TextProps>(TextComponent);

export default Text;
