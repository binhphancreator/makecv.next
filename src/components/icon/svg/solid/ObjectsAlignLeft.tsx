import React from "react";
import { SvgProps } from "~/types/app";

const ObjectsAlignLeft = ({ width, height, color }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      fill={color}
    >
      <path d="M0 24v464c0 13.3 10.7 24 24 24s24-10.7 24-24V24C48 10.7 37.3 0 24 0S0 10.7 0 24zm176 40c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-64c0-26.5-21.5-48-48-48H176zm0 224c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48h160c26.5 0 48-21.5 48-48v-64c0-26.5-21.5-48-48-48H176z" />
    </svg>
  );
};

export default ObjectsAlignLeft;
