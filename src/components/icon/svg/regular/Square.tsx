import React from "react";
import { SvgProps } from "~/types/app";

const Square = ({ width, height, color }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} fill={color}>
    <path d="M20.571 2.571a.86.86 0 01.858.858V20.57a.86.86 0 01-.858.858H3.43a.86.86 0 01-.858-.858V3.43a.86.86 0 01.858-.858H20.57zM3.43 0A3.432 3.432 0 000 3.429V20.57A3.432 3.432 0 003.429 24H20.57A3.432 3.432 0 0024 20.571V3.43A3.432 3.432 0 0020.571 0H3.43z" />
  </svg>
);

export default Square;
