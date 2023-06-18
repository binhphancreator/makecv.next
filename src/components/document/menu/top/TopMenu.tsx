import React, { useMemo } from "react";
import SvgIcon from "~/components/icon/SvgIcon";
import classNames from "classnames";
import ColorPalettes from "~/constants/colors";
import { useAppDispatch, useAppSelector } from "~/hook";
import { setTabActiveIndexLayerMenu } from "~/redux/documentSlice";

interface TopMenuProps {}

const TopMenu = ({}: TopMenuProps) => {
  const dispatch = useAppDispatch();

  const height = useAppSelector(
    (state) => state.documentState.viewport.heightTopMenu
  );
  const tabActiveIndexLayerMenu = useAppSelector(
    (state) => state.documentState.viewport.tabActiveIndexLayerMenu
  );

  const topMenuStyle = useMemo<React.CSSProperties>(() => {
    return {
      height: `${height}px`,
      background: ColorPalettes.neutral800,
    };
  }, [height]);

  const handleChangeTabActiveIndexLayerMenu = (tabIndex: number) => {
    if (tabIndex === tabActiveIndexLayerMenu) {
      return;
    }
    dispatch(setTabActiveIndexLayerMenu({ tabIndex }));
  };

  return (
    <div className="top-menu" style={topMenuStyle}>
      <div className="tabs-layer-menu">
        <button
          onClick={() => handleChangeTabActiveIndexLayerMenu(0)}
          className={classNames({
            "btn-tab": true,
            active: tabActiveIndexLayerMenu === 0,
          })}
        >
          <SvgIcon
            name="layer-group"
            width={20}
            height={20}
            color={ColorPalettes.neutral100}
          />
        </button>
        <button
          onClick={() => handleChangeTabActiveIndexLayerMenu(1)}
          className={classNames({
            "btn-tab": true,
            active: tabActiveIndexLayerMenu === 1,
          })}
        >
          <SvgIcon
            name="shapes"
            width={20}
            height={20}
            color={ColorPalettes.neutral100}
          />
        </button>
        <button
          onClick={() => handleChangeTabActiveIndexLayerMenu(2)}
          className={classNames({
            "btn-tab": true,
            active: tabActiveIndexLayerMenu === 2,
          })}
        >
          <SvgIcon
            type="solid"
            name="box"
            width={20}
            height={20}
            color={ColorPalettes.neutral100}
          />
        </button>
      </div>
    </div>
  );
};

export default TopMenu;
