import React from "react";

interface LayerItemProps {
  keyRender: string;
  hierarchy: number;
}

const LayerItem = ({ keyRender, hierarchy }: LayerItemProps) => {
  return (
    <div className="layer-item">
      <div />
    </div>
  );
};

export default LayerItem;
