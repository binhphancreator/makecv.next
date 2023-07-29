import React from "react";
import SvgIcon from "~/components/icon/SvgIcon";
import ColorPalettes from "~/constants/colors";
import EditSelect from "~/components/document/menu/edit/input/EditSelect";
import EditInput from "~/components/document/menu/edit/input/EditInput";
import EditSegment from "~/components/document/menu/edit/input/EditSegment";
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
        <div className={styles.row}>
          <EditInput
            width={72}
            label={<SvgIcon name="letter-spacing" color={ColorPalettes.gray400} width={14} />}
            defaultValue={0}
          />
          <EditInput
            width={72}
            label={<SvgIcon name="line-height" color={ColorPalettes.gray400} width={14} />}
            defaultValue={0}
          />
        </div>
        <div className={styles.row}>
          <EditInput
            width={72}
            label={<SvgIcon name="pharagraph-spacing" color={ColorPalettes.gray400} width={14} />}
            defaultValue={0}
          />
          <EditSegment.Line>
            <EditSegment.Item width={24} height={24} value={"auto-width"}>
              <SvgIcon type="light" name="arrows-left-right" color={ColorPalettes.gray600} height={16} />
            </EditSegment.Item>
            <EditSegment.Item width={24} height={24} value={"auto-height"}>
              <SvgIcon type="light" name="arrows-up-down" color={ColorPalettes.gray600} height={16} />
            </EditSegment.Item>
            <EditSegment.Item width={24} height={24} value={"fixed"}>
              <SvgIcon type="light" name="square" color={ColorPalettes.gray600} height={16} />
            </EditSegment.Item>
          </EditSegment.Line>
        </div>
      </div>
    </div>
  );
};

export default TextFormating;
