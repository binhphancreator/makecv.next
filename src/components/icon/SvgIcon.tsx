import React, { useMemo } from "react";
import { SvgName, SvgType, REGULAR_ICONS, SOLID_ICONS } from "./svg";
import { SvgProps } from "~/types/app";

type SvgIconProps = {
  name: SvgName;
  type?: SvgType;
} & SvgProps;

const SvgIcon = ({
  name,
  type: initialType,
  width,
  height,
  color,
}: SvgIconProps) => {
  const defaultColor = "currentColor";

  const SvgComponent = useMemo<React.FC<SvgProps> | null>(() => {
    const type = initialType ?? "regular";
    switch (type) {
      case "regular":
        return REGULAR_ICONS[name];
      case "solid":
        return SOLID_ICONS[name];
      default:
        return null;
    }
  }, [name, initialType]);

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
