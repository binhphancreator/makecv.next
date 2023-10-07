import { DocumentColor } from "~/types/document";
import { AbsoluteSize } from "~/types/values";

export type VectorProps = {
  size: AbsoluteSize;
  radius?: number | number[];
  fill: DocumentColor;
};
