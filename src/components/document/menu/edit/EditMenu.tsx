import React, { useMemo, useState } from "react";
import { MIN_WIDTH_EDIT_MENU } from "~/constants/document";
import Alignment from "./tools/Alignment";
import { useAppSelector } from "~/hook";

interface EditMenuProps {
  width?: number;
}

const EditMenu = ({ width: initialWidth }: EditMenuProps) => {
  const heightTopMenu = useAppSelector(
    (state) => state.documentState.viewport.heightTopMenu
  );
  const [width] = useState(initialWidth ?? MIN_WIDTH_EDIT_MENU);
  const refEditMenu = React.createRef<HTMLDivElement>();

  const editMenuStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: `${width}px`,
      paddingTop: `${heightTopMenu + 16}px`,
    };
  }, [width, heightTopMenu]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={refEditMenu}
      onMouseDown={handleMouseDown}
      className="edit-menu"
      style={editMenuStyle}
    >
      <Alignment />
      <div className="tools-divider" />
    </div>
  );
};

export default EditMenu;
