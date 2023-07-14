import React from "react";
import { SvgProps } from "~/types/app";

const X = ({ width, height, color }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={width} height={height} fill={color}>
    <path d="M378.4 71.4c8.5-10.1 7.2-25.3-2.9-33.8s-25.3-7.2-33.8 2.9L192 218.7 42.4 40.6c-8.5-10.2-23.7-11.5-33.8-3s-11.5 23.7-3 33.8L160.7 256 5.6 440.6c-8.5 10.2-7.2 25.3 2.9 33.8s25.3 7.2 33.8-2.9L192 293.3l149.6 178.1c8.5 10.1 23.7 11.5 33.8 2.9s11.5-23.7 2.9-33.8L223.3 256l155-184.6z" />
  </svg>
);

export default X;
