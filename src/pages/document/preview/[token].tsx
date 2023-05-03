import React, { useEffect } from "react";
import Viewport from "~/components/document/Viewport";
import data from "~/data/render";
import { DataRender } from "~/types/document";
import { useAppDispatch } from "~/hook";
import { initDataRender } from "~/redux/documentSlice";

interface PreviewProps {
  data: DataRender[];
}

const Preview = ({ data: initialData }: PreviewProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initDataRender({ data: initialData }));
  }, []);

  return (
    <div className="document-preview-page">
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
