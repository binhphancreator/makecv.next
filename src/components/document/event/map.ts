import { WheelEvent } from "react";
import { ColorValue, HSBColor } from "~/components/color/types";
import { FormatNameProp } from "~/components/document/text/formats";

export type FormatTextEvent = {
  format: FormatNameProp;
  value?: any;
};

export type ShowColorModalEvent = {
  onChange?(hsb: HSBColor): any;
  color?: ColorValue;
};

export interface DocumentEventMap {
  "viewport.scale": WheelEvent<HTMLDivElement> | globalThis.WheelEvent;
  "viewport.scroll": WheelEvent<HTMLDivElement> | globalThis.WheelEvent;
  "document.keypress": KeyboardEvent;
  "editor.text.format": FormatTextEvent;
  "modal.color.show": ShowColorModalEvent;
}
