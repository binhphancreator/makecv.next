import React from "react";
import { SvgProps } from "~/types/app";

const Text = ({ width, height, color }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    enableBackground="new 0 0 512 512"
    version="1.1"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    width={width}
    height={height}
    fill={color}
  >
    <path d="M80 80v48c0 13.3-10.7 24-24 24s-24-10.7-24-24V72c0-22.1 17.9-40 40-40h368c22.1 0 40 17.9 40 40v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V80H280v352h48c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24h48V80H80z" />
  </svg>
);

export default Text;
