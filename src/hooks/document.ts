import { useMemo } from "react";
import { useAppSelector } from "~/hooks/app";
import { Color } from "~/types/document";

export const useDocumentColor = (color?: Color, defaultColor?: Color) => {
  const colorPalettes = useAppSelector((state) => state.documentState.colorPalettes);

  return useMemo<string>(() => {
    if (!color || !color.length) {
      return defaultColor || "#000000";
    }

    if (/color_palette\.[0-9]+/.test(color)) {
      const colorIndex = parseInt(color.split(".")[1]);
      if (colorPalettes[colorIndex]) {
        return colorPalettes[colorIndex];
      }
    }

    return color;
  }, [color, colorPalettes]);
};
