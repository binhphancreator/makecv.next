import React from "react";
import { SvgProps } from "~/types/app";

const H = ({ width, height, color }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={width} height={height} fill={color}>
    <path d="M336 256l0 200c0 13.3 10.7 24 24 24s24-10.7 24-24l0-232V56c0-13.3-10.7-24-24-24s-24 10.7-24 24V208L48 208 48 56c0-13.3-10.7-24-24-24S0 42.7 0 56L0 456c0 13.3 10.7 24 24 24s24-10.7 24-24l0-200 288 0z" />
  </svg>
);

export default H;
