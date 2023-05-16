import React from "react";
import SVG_MAP from "./svg";
import { SvgProps } from "~/types/app";

type SvgIconProps = {
  name: string;
} & SvgProps;

const SvgIcon = ({ name, width, height }: SvgIconProps) => {
  if (!SVG_MAP[name]) {
    return null;
  }

  const Svg = SVG_MAP[name];

  return (
    <div className="svg-icon">
      <Svg width={width} height={height} />
    </div>
  );
};

export default SvgIcon;
