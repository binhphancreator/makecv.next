import React from "react";
import IconsMap, { SvgName, SvgType } from "./svg";
import { SvgProps } from "~/types/app";
import styles from "@/components/icon/svg.module.scss";

type SvgIconProps = {
  name: SvgName;
  type?: SvgType;
} & SvgProps;

const SvgIcon = ({ name, type, width, height, color }: SvgIconProps) => {
  const defaultColor = "currentColor";

  if (!IconsMap[type ?? "regular"] || !IconsMap[type ?? "regular"][name]) {
    return null;
  }

  const SvgComponent = IconsMap[type ?? "regular"][name];

  return (
    <div className={styles.container}>
      <SvgComponent width={width} height={height} color={color ?? defaultColor} />
    </div>
  );
};

export default SvgIcon;
