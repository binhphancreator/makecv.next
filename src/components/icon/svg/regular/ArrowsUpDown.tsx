import React from "react";
import { SvgProps } from "~/types/app";

const ArrowsUpDown = ({ width, height, color }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={width} height={height} fill={color}>
    <path d="M177 7c-9.4-9.4-24.6-9.4-33.9 0L47 103c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55V430.1L81 375c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l96 96c9.4 9.4 24.6 9.4 33.9 0l96-96c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55V81.9l55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L177 7z" />
  </svg>
);

export default ArrowsUpDown;
