import React from "react";
import styles from "@/components/document/menu/edit/tools/text-formating.module.scss";
import SvgIcon from "~/components/icon/SvgIcon";
import ColorPalettes from "~/constants/colors";
import EditSelectDropDown from "../input/EditSelectDropDown";

const TextFormating = () => {
  return (
    <div className={styles.container}>
      <div className={styles.border} />
      <div className={styles.header}>
        <div className={styles.title}>Text</div>
        <SvgIcon name="setting" color={ColorPalettes.gray600} width={24} />
      </div>
      <div className={styles.body}>
        <div className={styles["format-font"]}>Inter</div>
        <div className={styles.row}>
          <EditSelectDropDown value="Regular" width={94} />
          <EditSelectDropDown value="12" width={80} />
        </div>
      </div>
    </div>
  );
};

export default TextFormating;
