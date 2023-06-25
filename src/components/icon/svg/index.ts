import { SvgProps } from "~/types/app";

import DefaultImage from "./regular/DefaultImage";
import Frame from "./regular/Frame";
import Text from "./regular/Text";
import Shapes from "./regular/Shapes";
import Image from "./regular/Image";
import LayerGroup from "./regular/LayerGroup";

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
