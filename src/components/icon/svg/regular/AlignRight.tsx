import React from "react";
import { SvgProps } from "~/types/app";

const AlignRight = ({ width, height, color }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={width} height={height} fill={color}>
    <path d="M424 40c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24h240zm0 128c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h400zm24 152c0 13.3-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24h240c13.3 0 24 10.7 24 24zm-24 104c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h400z" />
  </svg>
);

export default AlignRight;
