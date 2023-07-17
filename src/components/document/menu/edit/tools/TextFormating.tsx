import React from "react";
import styles from "@/components/document/menu/edit/tools/text-formating.module.scss";
import SvgIcon from "~/components/icon/SvgIcon";
import ColorPalettes from "~/constants/colors";

const TextFormating = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Text</div>
        <SvgIcon name="setting" color={ColorPalettes.gray600} width={24} />
      </div>
    </div>
  );
};

export default TextFormating;
