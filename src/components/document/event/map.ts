import { WheelEvent } from "react";

export interface DocumentEventMap {
  "viewport.scale": WheelEvent<HTMLDivElement>;
  "viewport.scroll": WheelEvent<HTMLDivElement>;
}
