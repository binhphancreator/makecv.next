import React from "react";
import { DataRender } from "~/types/document";
import { renderComponent } from "~/utils/document";

interface FlexRowProps {
  style?: React.CSSProperties;
  childrenDataRender?: DataRender[];
}

const FlexRow = ({ childrenDataRender, style }: FlexRowProps) => {
  return (
    <div className="d-flex w-full" style={style}>
      {renderComponent(childrenDataRender)}
    </div>
  );
};

export default FlexRow;
