import React from "react";
import { SvgProps } from "~/types/app";

const LinkSimpleVertical = ({ width, height, color }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} fill={"none"}>
    <path
      fill={color}
      d="M18.25 6.74v1.51c0 .41-.34.75-.75.75s-.75-.34-.75-.75V6.74c0-2.62-2.13-4.75-4.75-4.75S7.25 4.12 7.25 6.74v1.5a.749.749 0 11-1.5 0v-1.5C5.75 3.29 8.55.49 12 .49s6.25 2.8 6.25 6.25zM18.25 16.25v1.5c0 3.45-2.8 6.25-6.25 6.25s-6.25-2.8-6.25-6.25v-1.5c0-.41.34-.75.75-.75s.75.34.75.75v1.5c0 2.62 2.13 4.75 4.75 4.75s4.75-2.13 4.75-4.75v-1.5c0-.41.34-.75.75-.75s.75.34.75.75z"
    />
    <path fill={color} d="M12.75 8v8c0 .41-.34.75-.75.75s-.75-.34-.75-.75V8c0-.41.34-.75.75-.75s.75.34.75.75z" />
  </svg>
);

export default LinkSimpleVertical;
