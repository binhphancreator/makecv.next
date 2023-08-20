import React from "react";
import { SvgProps } from "~/types/app";

const ArrowsLeftRight = ({ width, height, color }: SvgProps) => (
  <svg viewBox="0 0 512 512" width={width} height={height} fill={color}>
    <path d="M503.3 271.3c6.1-6.1 6.3-15.9 .4-22.2l-96-104c-6-6.5-16.1-6.9-22.6-.9s-6.9 16.1-.9 22.6L455.5 244 50.6 244l68.7-68.7c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-96 96c-6.2 6.2-6.2 16.4 0 22.6l96 96c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L50.6 276l402.7 0-68.7 68.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l96-96z" />
  </svg>
);

export default ArrowsLeftRight;
