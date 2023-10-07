import { useMemo } from "react";
import { useAppSelector } from "~/hooks/app";
import { Position } from "~/types/document";

export const usePositionEditMenu = () => {
  const viewportBoundingSize = useAppSelector((state) => state.documentState.viewport.boundingSize);
  const widthEditMenu = 280;

  return useMemo<Position | null>(() => {
    if (!viewportBoundingSize) {
      return null;
    }

    return {
      x: viewportBoundingSize.width - widthEditMenu,
      y: 0,
    };
  }, [viewportBoundingSize, widthEditMenu]);
};
