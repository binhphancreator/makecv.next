import React from "react";
import { SvgProps } from "~/types/app";

const DistributeSpacingHorizontal = ({ width, height, color }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      fill={color}
    >
      <path d="M32 24C32 10.7 42.7 0 56 0s24 10.7 24 24v464c0 13.3-10.7 24-24 24s-24-10.7-24-24V24zm128 120c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v224c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48V144zM456 0c13.3 0 24 10.7 24 24v464c0 13.3-10.7 24-24 24s-24-10.7-24-24V24c0-13.3 10.7-24 24-24z" />
    </svg>
  );
};

export default DistributeSpacingHorizontal;
