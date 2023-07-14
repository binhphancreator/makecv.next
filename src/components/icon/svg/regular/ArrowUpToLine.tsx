import React from "react";
import { SvgProps } from "~/types/app";

const ArrowUpToLine = ({ width, height, color }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={width} height={height} fill={color}>
    <path d="M24 32C10.7 32 0 42.7 0 56S10.7 80 24 80H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM209.5 167.6c-4.5-4.8-10.9-7.6-17.5-7.6s-12.9 2.7-17.5 7.6l-128 136c-9.1 9.7-8.6 24.8 1 33.9s24.8 8.6 33.9-1L168 244.5V328 456c0 13.3 10.7 24 24 24s24-10.7 24-24V328 244.5l86.5 91.9c9.1 9.7 24.3 10.1 33.9 1s10.1-24.3 1-33.9l-128-136z" />
  </svg>
);

export default ArrowUpToLine;
