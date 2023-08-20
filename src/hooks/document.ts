import { useMemo } from "react";
import { useAppSelector } from "~/hooks/app";
import { Color, DataRender } from "~/types/document";

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
