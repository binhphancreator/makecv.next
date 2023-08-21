import React, { useState } from "react";
import Modal from "~/components/document/modal/Modal";
import Saturation from "~/components/color/Saturation";
import { Size } from "~/types/document";
import { toHSB } from "~/utils/color";

const SketchPicker = () => {
  const [size] = useState<Size>({
    width: 250,
    height: 500,
  });

  return (
    <Modal title="Color" size={size}>
      <Saturation size={{ width: size.width, height: size.width }} hsbColor={toHSB("#20D131")} />
    </Modal>
  );
};

export default SketchPicker;
