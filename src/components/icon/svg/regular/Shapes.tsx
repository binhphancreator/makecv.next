import React from "react";
import { SvgProps } from "~/types/app";

const Shapes = ({ width, height, color }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={width}
    height={height}
    fill={color}
  >
    <path d="M164.6 175.5l96-160C266.3 5.9 276.8 0 288 0s21.7 5.9 27.4 15.5l96 160c5.9 9.9 6.1 22.2.4 32.2s-16.3 16.2-27.8 16.2H192c-11.5 0-22.2-6.2-27.8-16.2s-5.5-22.3.4-32.2zM288 63.1L220.3 176h135.4L288 63.1zM464 320H336v128h128V320zm-136-48h144c22.1 0 40 17.9 40 40v144c0 22.1-17.9 40-40 40H328c-22.1 0-40-17.9-40-40V312c0-22.1 17.9-40 40-40zM208 384a80 80 0 10-160 0 80 80 0 10160 0zM0 384a128 128 0 11256 0 128 128 0 11-256 0z" />
  </svg>
);

export default Shapes;
