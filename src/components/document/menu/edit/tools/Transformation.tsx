import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "~/hooks/app";
import EditInput, { EditInputMethods } from "../input/EditInput";
import styles from "@/components/document/menu/edit/tools/transformation.module.scss";
import SvgIcon from "~/components/icon/SvgIcon";
import ColorPalettes from "~/constants/colors";
import classNames from "classnames";

type PositionValue = {
  x: "Mixed" | number;
  y: "Mixed" | number;
};

type SizeValue = {
  width: "Mixed" | number;
  height: "Mixed" | number;
};

const Transformation = () => {
  const flatDataRender = useAppSelector((state) => state.documentState.flatDataRender);
  const selectingKeys = useAppSelector((state) => state.documentState.selectingKeys);
  const positionXInputRef = useRef<EditInputMethods>(null);
  const positionYInputRef = useRef<EditInputMethods>(null);
  const widthInputRef = useRef<EditInputMethods>(null);
  const heightInputRef = useRef<EditInputMethods>(null);

  const [linkedSize, setLinkedSize] = useState(false);

  const position = useMemo<PositionValue | null>(() => {
    if (selectingKeys.length > 1) {
      return {
        x: "Mixed",
        y: "Mixed",
      };
    }
    if (selectingKeys.length === 1) {
      const key = selectingKeys[0];
      const dataRender = flatDataRender[key];
      if (!dataRender) {
        return null;
      }
      if (dataRender.position) {
        return {
          x: dataRender.position.x,
          y: dataRender.position.y,
        };
      }
    }
    return null;
  }, [selectingKeys, flatDataRender]);

  const size = useMemo<SizeValue | null>(() => {
    if (selectingKeys.length > 1) {
      return {
        width: "Mixed",
        height: "Mixed",
      };
    }
    if (selectingKeys.length === 1) {
      const key = selectingKeys[0];
      const dataRender = flatDataRender[key];
      if (!dataRender) {
        return null;
      }
      if (dataRender.size) {
        return {
          width: dataRender.size.width,
          height: dataRender.size.height,
        };
      }
      if (dataRender.boundingSize) {
        return {
          width: dataRender.boundingSize.width,
          height: dataRender.boundingSize.height,
        };
      }
    }
    return null;
  }, [selectingKeys]);

  useEffect(() => {
    if (position) {
      positionXInputRef.current?.setValue(position.x);
      positionYInputRef.current?.setValue(position.y);
    }
  }, [position]);

  useEffect(() => {
    if (size) {
      widthInputRef.current?.setValue(size.width);
      heightInputRef.current?.setValue(size.height);
    }
  }, [size]);

  if (!selectingKeys.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <EditInput ref={positionXInputRef} label="X" defaultValue={position?.x} />
        <EditInput ref={positionYInputRef} label="Y" defaultValue={position?.y} />
      </div>
      <div className={styles.row}>
        <EditInput ref={widthInputRef} label="W" defaultValue={size?.width} />
        <EditInput ref={heightInputRef} label="H" defaultValue={size?.height} />
        <div
          className={classNames({
            [styles["option-button"]]: true,
            [styles.active]: linkedSize,
          })}
          onClick={() => setLinkedSize(!linkedSize)}
        >
          <SvgIcon name={linkedSize ? "link-simple" : "unlink-simple"} width={18} color={ColorPalettes.gray800} />
        </div>
      </div>
      <div className={styles.row}>
        <EditInput label={<SvgIcon name="angle-90" color={ColorPalettes.gray400} width={14} />} defaultValue={0} />
        <EditInput label={<SvgIcon name="radius" color={ColorPalettes.gray400} width={14} />} defaultValue={0} />
        <div className={styles["option-button"]}>
          <SvgIcon name="maximize-2" width={18} color={ColorPalettes.gray800} />
        </div>
      </div>
    </div>
  );
};

export default Transformation;
