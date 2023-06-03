import React from "react";
import NextImage from "next/image";
import SvgIcon from "~/components/icon/SvgIcon";
import { Size } from "~/types/document";

interface ImageProps {
  source?: string;
  alt?: string;
  size: Size;
}

const Image = ({ source, alt, size }: ImageProps) => {
  const renderImage = () => {
    if (!source || !source.length) {
      return (
        <SvgIcon name="default-image" width={size.width} height={size.height} />
      );
    }
    return (
      <NextImage
        draggable={false}
        width={size.width}
        height={size.height}
        src={source}
        alt={alt || ""}
      />
    );
  };
  return <div className="document-image">{renderImage()}</div>;
};

export default Image;
