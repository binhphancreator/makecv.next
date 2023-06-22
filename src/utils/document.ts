import { ComponentMap } from "~/components/document";
import { Color, FlatMapDataRender, Position, TemplateDataRender } from "~/types/document";
import { nanoid } from "nanoid";

export const resolveComponent = (component: string) => {
  return ComponentMap[component];
};

export const generateKey = (size?: number) => {
  return nanoid(size || 10);
};

export const transformTemplateDataRender = (initialData: TemplateDataRender[]): FlatMapDataRender => {
  const flatDataRender: FlatMapDataRender = {};
  const recursiveForeach = (data: TemplateDataRender[], parentKey?: string) => {
    if (!data.length) {
      return;
    }
    for (let _data of data) {
      const key = generateKey(30);
      flatDataRender[key] = {
        key,
        parentKey,
        name: _data.name,
        component: _data.component,
        options: _data.options,
        style: _data.style,
        position: _data.position,
        size: _data.size,
      };
      if (_data.children) {
        recursiveForeach(_data.children, key);
      }
    }
  };

  recursiveForeach(initialData);
  return flatDataRender;
};

export const calcNewPositionAfterScale = (position: Position, originPosition: Position, scale: number): Position => {
  return {
    x: scale * (position.x - originPosition.x) + originPosition.x,
    y: scale * (position.y - originPosition.y) + originPosition.y,
  };
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
