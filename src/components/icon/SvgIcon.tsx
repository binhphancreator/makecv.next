import React from "react";
import SVG_MAP, { SvgName } from "./svg";
import { SvgProps } from "~/types/app";

type SvgIconProps = {
  name: SvgName;
} & SvgProps;

const SvgIcon = ({ name, width, height, color }: SvgIconProps) => {
  const defaultColor = "currentColor";

  const SvgComponent = SVG_MAP[name];

  if (!SvgComponent) {
    return null;
  }

  return (
    <div className="svg-icon">
      <SvgComponent
        width={width}
        height={height}
        color={color ?? defaultColor}
      />
    </div>
  );
};

export default SvgIcon;
