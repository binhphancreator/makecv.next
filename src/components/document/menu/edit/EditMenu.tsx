import React, { useMemo, useState } from "react";
import { MIN_WIDTH_EDIT_MENU } from "~/constants/document";
import Alignment from "./tools/Alignment";
import { useAppSelector } from "~/hooks/app";
import styles from "@/components/document/menu/edit/edit.module.scss";
import Transformation from "./tools/Transformation";

interface EditMenuProps {
  width?: number;
}

const EditMenu = ({ width: initialWidth }: EditMenuProps) => {
  const heightTopMenu = useAppSelector((state) => state.documentState.viewport.heightTopMenu);
  const [width] = useState(initialWidth ?? MIN_WIDTH_EDIT_MENU);
  const refEditMenu = React.createRef<HTMLDivElement>();
  const selectingKeys = useAppSelector((state) => state.documentState.selectingKeys);

  const editMenuStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: `${width}px`,
      paddingTop: `${heightTopMenu + 16}px`,
    };
  }, [width, heightTopMenu]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const renderTransformation = () => {
    if (!selectingKeys.length) {
      return null;
    }
    return (
      <>
        <Transformation />
        <div className={styles.divider} />
      </>
    );
  };

  return (
    <div ref={refEditMenu} onMouseDown={handleMouseDown} className={styles.container} style={editMenuStyle}>
      <Alignment />
      <div className={styles.divider} />
      {renderTransformation()}
    </div>
  );
};

export default EditMenu;
