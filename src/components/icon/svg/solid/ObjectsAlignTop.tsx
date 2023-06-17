import React from "react";
import { SvgProps } from "~/types/app";

const ObjectsAlignTop = ({ width, height, color }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      fill={color}
    >
      <path d="M24 0h464c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 48 0 37.3 0 24S10.7 0 24 0zm40 176c0-26.5 21.5-48 48-48h64c26.5 0 48 21.5 48 48v288c0 26.5-21.5 48-48 48h-64c-26.5 0-48-21.5-48-48V176zm224 0c0-26.5 21.5-48 48-48h64c26.5 0 48 21.5 48 48v160c0 26.5-21.5 48-48 48h-64c-26.5 0-48-21.5-48-48V176z" />
    </svg>
  );
};

export default ObjectsAlignTop;
