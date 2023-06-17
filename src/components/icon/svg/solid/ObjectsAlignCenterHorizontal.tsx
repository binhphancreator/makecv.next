import React from "react";
import { SvgProps } from "~/types/app";

const ObjectsAlignCenterHorizontal = ({ width, height, color }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      fill={color}
    >
      <path d="M256 0c-13.3 0-24 10.7-24 24v40H80c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48h152v64h-88c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48h88v40c0 13.3 10.7 24 24 24s24-10.7 24-24v-40h88c26.5 0 48-21.5 48-48v-64c0-26.5-21.5-48-48-48h-88v-64h152c26.5 0 48-21.5 48-48v-64c0-26.5-21.5-48-48-48H280V24c0-13.3-10.7-24-24-24z" />
    </svg>
  );
};

export default ObjectsAlignCenterHorizontal;
