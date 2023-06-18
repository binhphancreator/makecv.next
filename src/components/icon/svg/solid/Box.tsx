import React from "react";
import { SvgProps } from "~/types/app";

const Box = ({ width, height, color }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      fill={color}
    >
      <path d="M82.7 58.5L32 160h208V32H125.7c-18.2 0-34.8 10.3-43 26.5zM272 160h208L429.3 58.5c-8.2-16.2-24.8-26.5-43-26.5H272v128zm208 32H32v224c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V192z" />
    </svg>
  );
};

export default Box;
