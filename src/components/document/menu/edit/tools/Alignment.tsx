import React, { useMemo } from "react";
import SvgIcon from "~/components/icon/SvgIcon";
import ColorPalettes from "~/constants/colors";
import { useAppSelector } from "~/hooks/app";
import styles from "@/components/document/edit-menu.module.scss";

interface AlignmentProps {}

const Alignment = ({}: AlignmentProps) => {
  const selectingKeys = useAppSelector((state) => state.documentState.selectingKeys);
  const blurColor = ColorPalettes.gray200;
  const activeColor = ColorPalettes.gray600;
  const sizeIcon = 16;

  const existSelected = useMemo<boolean>(() => {
    return selectingKeys.length > 0;
  }, [selectingKeys]);

  return (
    <div className={styles["tool-alignment"]}>
      <div className={styles["triggers-list"]}>
        <button className={styles["btn-trigger"]}>
          <SvgIcon
            type="solid"
            name="objects-align-left"
            width={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className={styles["btn-trigger"]}>
          <SvgIcon
            type="solid"
            name="objects-align-center-horizontal"
            width={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className={styles["btn-trigger"]}>
          <SvgIcon
            type="solid"
            name="objects-align-right"
            width={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className={styles["btn-trigger"]}>
          <SvgIcon
            type="solid"
            name="objects-align-top"
            width={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className={styles["btn-trigger"]}>
          <SvgIcon
            type="solid"
            name="objects-align-center-vertical"
            width={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className={styles["btn-trigger"]}>
          <SvgIcon
            type="solid"
            name="objects-align-bottom"
            width={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className={styles["btn-trigger"]}>
          <SvgIcon
            type="solid"
            name="distribute-spacing-horizontal"
            width={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
      </div>
    </div>
  );
};

export default Alignment;
