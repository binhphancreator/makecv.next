import React from "react";
import { SvgProps } from "~/types/app";

const Frame = ({ width, height, color }: SvgProps) => (
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
    <path d="M480 120c0-13.3-10.7-24-24-24h-40V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v40H144V56c0-13.3-10.7-24-24-24S96 42.7 96 56v40H56c-13.3 0-24 10.7-24 24s10.7 24 24 24h40v224H56c-13.3 0-24 10.7-24 24s10.7 24 24 24h40v40c0 13.3 10.7 24 24 24s24-10.7 24-24v-40h224v40c0 13.3 10.7 24 24 24s24-10.7 24-24v-40h40c13.3 0 24-10.7 24-24s-10.7-24-24-24h-40V144h40c13.3 0 24-10.7 24-24zM144 368V144h224v224H144z" />
  </svg>
);

export default Frame;
