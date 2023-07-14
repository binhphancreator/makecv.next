import React from "react";
import { SvgProps } from "~/types/app";

const Y = ({ width, height, color }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={width} height={height} fill={color}>
    <path d="M43.4 41.9c-7.7-10.7-22.7-13.1-33.5-5.3S-3.2 59.3 4.6 70.1L168 295.8V456c0 13.3 10.7 24 24 24s24-10.7 24-24V295.8L379.4 70.1c7.8-10.7 5.4-25.7-5.4-33.5s-25.7-5.4-33.5 5.4L192 247.1 43.4 41.9z" />
  </svg>
);

export default Y;
