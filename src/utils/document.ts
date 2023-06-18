import { ComponentMap } from "~/components/document";
import { Color, DataRender, Position } from "~/types/document";
import { nanoid } from "nanoid";

export const resolveComponent = (component: string) => {
  return ComponentMap[component];
};

export const generateKey = (size?: number) => {
  return nanoid(size || 10);
};

export const recursiveForeach = (
  data: DataRender[],
  callbackfn: (item: DataRender) => void
) => {
  data.forEach((_) => {
    callbackfn(_);
    if (_.children && _.children.length) {
      recursiveForeach(_.children, callbackfn);
    }
  });
};

export const transformRenderData = (data: DataRender[], parentKey?: string) => {
  data.forEach &&
    data.forEach((render) => {
      render.key = nanoid(10);
      if (parentKey && parentKey.length) {
        render.parentKey = parentKey;
      }
      if (render.children && render.children.length) {
        transformRenderData(render.children, render.key);
      }
    });
};

export const calcNewPositionAfterScale = (
  position: Position,
  originPosition: Position,
  scale: number
): Position => {
  const newPosition: Position = {
    x: scale * (position.x - originPosition.x) + originPosition.x,
    y: scale * (position.y - originPosition.y) + originPosition.y,
  };
  return newPosition;
};

export const findColor = (color: Color, colorPalettes: string[]): string => {
  if (color && color.length) {
    if (/color_palette\.[0-9]+/.test(color)) {
      const colorIndex = parseInt(color.split(".")[1]);
      if (colorIndex && colorPalettes[colorIndex]) {
        return colorPalettes[colorIndex];
      }
    } else {
      return color;
    }
  }
  return "#000000";
};
