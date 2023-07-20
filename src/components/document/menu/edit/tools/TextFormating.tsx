import React from "react";
import SvgIcon from "~/components/icon/SvgIcon";
import ColorPalettes from "~/constants/colors";
import EditSelect from "../input/EditSelect";
import styles from "@/components/document/menu/edit/tools/text-formating.module.scss";

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
          <EditSelect.Input value="Regular" width={120}>
            <EditSelect.Option>Thin</EditSelect.Option>
            <EditSelect.Option>Light</EditSelect.Option>
            <EditSelect.Option>ExtraLight</EditSelect.Option>
            <EditSelect.Option>Regular</EditSelect.Option>
            <EditSelect.Option>Medium</EditSelect.Option>
            <EditSelect.Option>SemiBold</EditSelect.Option>
            <EditSelect.Option>Bold</EditSelect.Option>
          </EditSelect.Input>
          <EditSelect.Input value="12" width={80} />
        </div>
      </div>
    </div>
  );
};

export default TextFormating;
