import { WheelEvent } from "react";
import { FormatNameProp } from "~/components/document/text/formats";

export type FormatTextEvent = {
  format: FormatNameProp;
  value?: any;
};

export interface DocumentEventMap {
  "viewport.scale": WheelEvent<HTMLDivElement>;
  "viewport.scroll": WheelEvent<HTMLDivElement>;
  "document.keypress": KeyboardEvent;
  "editor.text.format": FormatTextEvent;
}
