import React from "react";
import { SvgProps } from "~/types/app";

const UnlinkSimple = ({ width, height, color }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} fill={"none"}>
    <path
      fill={color}
      d="M17.26 18.25h-1.51c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.51c2.62 0 4.75-2.13 4.75-4.75s-2.13-4.75-4.75-4.75h-1.5a.749.749 0 110-1.5h1.5c3.45 0 6.25 2.8 6.25 6.25s-2.8 6.25-6.25 6.25zM7.75 18.25h-1.5C2.8 18.25 0 15.45 0 12s2.8-6.25 6.25-6.25h1.5c.41 0 .75.34.75.75s-.34.75-.75.75h-1.5C3.63 7.25 1.5 9.38 1.5 12s2.13 4.75 4.75 4.75h1.5c.41 0 .75.34.75.75s-.34.75-.75.75z"
    />
  </svg>
);

export default UnlinkSimple;
