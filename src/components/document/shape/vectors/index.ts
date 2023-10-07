import { VectorProps } from "~/components/document/shape/types";
import Rectangle from "./Rectangle";

const VECTOR_MAP = {
  rectangle: Rectangle,
};

export type VectorName = keyof typeof VECTOR_MAP;

export default VECTOR_MAP as { [key: string]: React.FC<VectorProps> };
