import React from "react";
import { SvgProps } from "~/types/app";

const Square = ({ width, height, color }: SvgProps) => (
  <svg viewBox="0 0 448 512" width={width} height={height} fill={color}>
    <path d="M384 64c17.7 0 32 14.3 32 32V416c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
  </svg>
);

export default Square;
