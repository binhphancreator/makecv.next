import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/app";
import { initDataRender } from "~/redux/documentSlice";
import { TemplateDataRender } from "~/types/document";
import { transformTemplateDataRender } from "~/utils/document";
import Viewport from "./viewport/Viewport";
import emitter from "./event";

interface DocumentProps {
  templateData: TemplateDataRender[];
}

const Document = ({ templateData }: DocumentProps) => {
  const dispatch = useAppDispatch();
  const flatDataRender = useAppSelector((state) => state.documentState.flatDataRender);

  useEffect(() => {
    const handleOnKeyPress = (event: KeyboardEvent) => emitter.dispatch("document.keypress", event);
    window.addEventListener("keypress", handleOnKeyPress);
    return () => window.removeEventListener("keypress", handleOnKeyPress);
  }, []);

  useEffect(() => {
    dispatch(initDataRender({ flatDataRender: transformTemplateDataRender(templateData) }));
  }, [templateData]);

  if (Object.keys(flatDataRender).length <= 0) {
    return null;
  }

  return <Viewport />;
};

export default Document;
