import React from "react";
import { NextPage } from "next";
import Viewport from "~/components/document/Viewport";
import Paper from "~/components/document/Paper";

interface PreviewProps {}

const Preview: NextPage = ({}: PreviewProps) => {
  return (
    <div className="document-preview-page">
      <Viewport position={{ x: 0, y: 0 }}>
        <Paper size={"A4"} />
      </Viewport>
    </div>
  );
};

export default Preview;
