import React from "react";
import styles from "@/components/document/viewport/areas/float-area.module.scss";
import SketchPicker from "~/components/document/modal/SketchPicker";

const FloatArea = () => {
  return (
    <div className={styles.container}>
      <SketchPicker />
    </div>
  );
};

export default FloatArea;
