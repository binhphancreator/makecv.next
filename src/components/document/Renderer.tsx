import React from "react";
import { DataRender } from "~/types/document";
import { resolveComponent } from "~/utils/document";

interface RendererProps {
  data: DataRender;
}

export interface RendererMethods {}

const Renderer = ({ data }: RendererProps) => {
  const ComponentRender = resolveComponent(data.component);
  if (ComponentRender) {
    return (
      <ComponentRender
        {...data.options}
        childrenDataRender={data.children}
        style={data.style}
        size={data.size}
        position={data.position}
      />
    );
  }
  return null;
};

export default Renderer;
