import { SvgProps } from "~/types/app";

import DefaultImage from "./regular/DefaultImage";
import Frame from "./regular/Frame";
import Text from "./regular/Text";
import Shapes from "./regular/Shapes";
import Image from "./regular/Image";
import LayerGroup from "./regular/LayerGroup";
import Radius from "./regular/Radius";
import LineHeight from "./regular/LineHeight";
import Angle90 from "./regular/Angle90";
import ArrowsToLine from "./regular/ArrowsToLine";
import ArrowUpToLine from "./regular/ArrowUpToLine";
import ArrowDownToLine from "./regular/ArrowDownToLine";
import AlignLeft from "./regular/AlignLeft";
import AlignCenter from "./regular/AlignCenter";
import AlignRight from "./regular/AlignRight";
import ArrowsLeftRight from "./regular/ArrowsLeftRight";
import ArrowsUpDown from "./regular/ArrowsUpDown";
import LinkSimpleVertical from "./regular/LinkSimpleVertical";
import UnlinkSimpleVertical from "./regular/UnlinkSimpleVertical";
import LinkSimple from "./regular/LinkSimple";
import UnlinkSimple from "./regular/UnlinkSimple";
import Setting from "./regular/Setting";
import Maximize2 from "./regular/Maximize2";
import ChevronDown from "./regular/ChevronDown";

import SolidObjectsAlignLeft from "./solid/ObjectsAlignLeft";
import SolidObjectsAlignRight from "./solid/ObjectsAlignRight";
import SolidObjectsAlignTop from "./solid/ObjectsAlignTop";
import SolidObjectsAlignBottom from "./solid/ObjectsAlignBottom";
import SolidObjectsAlignCenterHorizontal from "./solid/ObjectsAlignCenterHorizontal";
import SolidObjectsAlignCenterVertical from "./solid/ObjectsAlignCenterVertical";
import SolidDistributeSpacingHorizontal from "./solid/DistributeSpacingHorizontal";
import SolidDistributeSpacingVertical from "./solid/DistributeSpacingVertical";
import SolidBox from "./solid/Box";

const IconsMap = {
  regular: {
    "default-image": DefaultImage,
    frame: Frame,
    text: Text,
    shapes: Shapes,
    image: Image,
    "layer-group": LayerGroup,
    radius: Radius,
    "angle-90": Angle90,
    "line-height": LineHeight,
    "align-left": AlignLeft,
    "align-center": AlignCenter,
    "align-right": AlignRight,
    "arrows-to-line": ArrowsToLine,
    "arrow-up-to-line": ArrowUpToLine,
    "arrow-down-to-line": ArrowDownToLine,
    "arrows-left-right": ArrowsLeftRight,
    "arrows-up-down": ArrowsUpDown,
    "link-simple-vertical": LinkSimpleVertical,
    "unlink-simple-vertical": UnlinkSimpleVertical,
    "link-simple": LinkSimple,
    "unlink-simple": UnlinkSimple,
    setting: Setting,
    "maximize-2": Maximize2,
    "chevron-down": ChevronDown,
  },
  solid: {
    "objects-align-left": SolidObjectsAlignLeft,
    "objects-align-right": SolidObjectsAlignRight,
    "objects-align-top": SolidObjectsAlignTop,
    "objects-align-bottom": SolidObjectsAlignBottom,
    "objects-align-center-horizontal": SolidObjectsAlignCenterHorizontal,
    "objects-align-center-vertical": SolidObjectsAlignCenterVertical,
    "distribute-spacing-horizontal": SolidDistributeSpacingHorizontal,
    "distribute-spacing-vertical": SolidDistributeSpacingVertical,
    box: SolidBox,
  },
};

export type SvgName = keyof typeof IconsMap.regular | keyof typeof IconsMap.solid;

export type SvgType = keyof typeof IconsMap;

export default IconsMap as {
  [key: string]: { [key: string]: React.FC<SvgProps> };
};
