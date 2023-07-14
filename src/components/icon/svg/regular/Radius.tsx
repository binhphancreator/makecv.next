import React from "react";
import { SvgProps } from "~/types/app";

const Radius = ({ width, height, color }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={width} height={height} fill={color}>
    <path d="M512 56.889H284.445c-125.725 0-227.556 101.831-227.556 227.556V512H0V284.445C0 127.374 127.375 0 284.445 0H512v56.889z" />
  </svg>
);

export default Radius;
