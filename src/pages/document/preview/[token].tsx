import React, { useEffect } from "react";
import Viewport from "~/components/document/Viewport";
import data from "~/data/render";
import { useAppDispatch } from "~/hooks/app";
import { initDataRender } from "~/redux/documentSlice";
import { TemplateDataRender } from "~/types/document";
import { transformTemplateDataRender } from "~/utils/document";
import styles from "@/pages/document/preview.module.scss";

interface PreviewProps {
  data: TemplateDataRender[];
}

const Preview = ({ data: initialData }: PreviewProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initDataRender({ flatDataRender: transformTemplateDataRender(initialData) }));
  }, []);

  return (
    <div className={styles.page}>
      <Viewport />
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
