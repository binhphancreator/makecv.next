import React from "react";
import LayerMenu from "../../menu/layer/LayerMenu";
import EditMenu from "../../menu/edit/EditMenu";
import TopMenu from "../../menu/top/TopMenu";

const BarArea = () => {
  return (
    <div>
      <LayerMenu />
      <EditMenu />
      <TopMenu />
    </div>
  );
};

export default BarArea;
