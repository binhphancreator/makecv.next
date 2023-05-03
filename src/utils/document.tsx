import React from "react";
import { ComponentMap } from "~/configs/document";
import { DataRender, Position } from "~/types/document";
import { nanoid } from "nanoid";
import Renderer from "~/components/document/Renderer";

export const resolveComponent = (component: string) => {
  return ComponentMap[component];
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
  return data;
};

export const renderComponent = (data?: DataRender[]) => {
  if (!data || !data.length) {
    return null;
  }

  return data.map((_, index) => {
    return <Renderer key={index.toString()} data={_} />;
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
