import React from "react";
import { SvgProps } from "~/types/app";

const Setting = ({ width, height, color }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} fill="none">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM2 12h5M17 12h5"
    />
  </svg>
);

export default Setting;
