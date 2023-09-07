import { useMemo } from "react";
import { useAppSelector } from "~/hooks/app";
import { DocumentColor, DataRender } from "~/types/document";
import { color2css } from "~/utils/color";

export const useDocumentColor = (color?: DocumentColor, defaultColor?: DocumentColor) => {
  const colorPalettes = useAppSelector((state) => state.documentState.colorPalettes);

  return useMemo<string>(() => {
    if (!color) {
      return color2css(defaultColor || "#000000");
    }

    if (typeof color === "string" && /color_palette\.[0-9]+/.test(color)) {
      const colorIndex = parseInt(color.split(".")[1]);
      if (colorPalettes[colorIndex]) {
        return colorPalettes[colorIndex];
      }
    }

    return color2css(color);
  }, [color, colorPalettes]);
};

export const useDocumentSelecting = () => {
  const flatDataRender = useAppSelector((state) => state.documentState.flatDataRender);
  const selectingKeys = useAppSelector((state) => state.documentState.selectingKeys);

  const first = useMemo<DataRender | null>(() => {
    if (!selectingKeys || !selectingKeys.length) {
      return null;
    }

    const firstKey = selectingKeys[0];
    if (flatDataRender[firstKey]) {
      return flatDataRender[firstKey];
    }

    return null;
  }, [selectingKeys, flatDataRender]);

  const length = selectingKeys.length;

  return { first, length };
};
