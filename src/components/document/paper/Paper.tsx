import React, { useMemo } from "react";
import ColorPalettes from "~/constants/colors";
import { useDocumentColor } from "~/hooks/document";
import { DocumentColor, Size } from "~/types/document";
import styles from "@/components/document/paper.module.scss";

interface PaperProps {
  size: Size;
  style?: React.CSSProperties;
  fill?: DocumentColor;
}

const Paper = ({ size, fill }: PaperProps) => {
  const paperRef = React.createRef<HTMLDivElement>();
  const background = useDocumentColor(fill, ColorPalettes.white);

  const paperStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    style.width = `${size.width}px`;
    style.minHeight = `${size.height}px`;
    style.minWidth = `${size.width}px`;
    style.maxWidth = `${size.width}px`;
    style.background = background;

    return style;
  }, [size, background]);

  return <div ref={paperRef} className={styles["paper"]} style={paperStyle} />;
};

export default Paper;
