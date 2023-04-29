import React from "react";
import { ComponentMap } from "~/configs/document";
import { DataRender } from "~/types/document";
import shortUUID from "short-uuid";
import Renderer from "~/components/document/Renderer";

export const resolveComponent = (component: string) => {
  return ComponentMap[component];
};

export const transformRenderData = (data: DataRender[], parentKey?: string) => {
  data.forEach &&
    data.forEach((render) => {
      render.key = shortUUID.generate();
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
