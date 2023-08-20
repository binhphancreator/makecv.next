import React from "react";
import data from "~/data/render";
import { TemplateDataRender } from "~/types/document";
import styles from "@/pages/document/preview.module.scss";
import Document from "~/components/document/Document";

interface PreviewProps {
  data: TemplateDataRender[];
}

const Preview = ({ data: templateData }: PreviewProps) => {
  return (
    <div className={styles.page}>
      <Document templateData={templateData} />
    </div>
  );
};

export function getServerSideProps() {
  const props: PreviewProps = {
    data,
  };
  return {
    props,
  };
}

export default Preview;
