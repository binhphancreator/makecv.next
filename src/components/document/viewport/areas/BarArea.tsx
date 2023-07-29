import React from "react";
import LayerMenu from "~/components/document/menu/layer/LayerMenu";
import EditMenu from "~/components/document/menu/edit/EditMenu";
import TopMenu from "~/components/document/menu/top/TopMenu";

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
