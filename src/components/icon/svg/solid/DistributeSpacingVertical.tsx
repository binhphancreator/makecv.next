import React from "react";
import { SvgProps } from "~/types/app";

const DistributeSpacingVertical = ({ width, height, color }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      fill={color}
    >
      <path d="M0 56c0-13.3 10.7-24 24-24h464c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 80 0 69.3 0 56zm96 152c0-26.5 21.5-48 48-48h224c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H144c-26.5 0-48-21.5-48-48v-96zM24 432h464c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
    </svg>
  );
};

export default DistributeSpacingVertical;
