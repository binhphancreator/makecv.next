import React from "react";
import { NextPage } from "next";
import TouchPaper from "~/components/document/TouchPaper";
import Paper from "~/components/document/Paper";

interface PreviewProps {}

const Preview: NextPage = ({}: PreviewProps) => {
  return (
    <div className="document-preview-page">
      <TouchPaper position={{ x: 0, y: 0 }}>
        <Paper size={"A4"} />
      </TouchPaper>
    </div>
  );
};

export default Preview;
