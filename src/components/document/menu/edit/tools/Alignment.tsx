import React, { useMemo } from "react";
import SvgIcon from "~/components/icon/SvgIcon";
import ColorPalettes from "~/constants/colors";
import { useAppSelector } from "~/hooks/app";

interface AlignmentProps {}

const Alignment = ({}: AlignmentProps) => {
  const selectingKeys = useAppSelector((state) => state.documentState.selectingKeys);
  const blurColor = ColorPalettes.gray200;
  const activeColor = ColorPalettes.gray600;
  const sizeIcon = 16;

  const existSelected = useMemo<boolean>(() => {
    return selectingKeys.length > 0;
  }, [selectingKeys]);

  return (
    <div className="tool-alignment">
      <div className="triggers-list">
        <button className="btn-trigger">
          <SvgIcon
            type="solid"
            name="objects-align-left"
            width={sizeIcon}
            height={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className="btn-trigger">
          <SvgIcon
            type="solid"
            name="objects-align-center-horizontal"
            width={sizeIcon}
            height={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className="btn-trigger">
          <SvgIcon
            type="solid"
            name="objects-align-right"
            width={sizeIcon}
            height={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className="btn-trigger">
          <SvgIcon
            type="solid"
            name="objects-align-top"
            width={sizeIcon}
            height={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className="btn-trigger">
          <SvgIcon
            type="solid"
            name="objects-align-center-vertical"
            width={sizeIcon}
            height={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className="btn-trigger">
          <SvgIcon
            type="solid"
            name="objects-align-bottom"
            width={sizeIcon}
            height={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
        <button className="btn-trigger">
          <SvgIcon
            type="solid"
            name="distribute-spacing-horizontal"
            width={sizeIcon}
            height={sizeIcon}
            color={existSelected ? activeColor : blurColor}
          />
        </button>
      </div>
    </div>
  );
};

export default Alignment;
