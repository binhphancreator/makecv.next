import { isCharacter } from "~/utils/character";
import { EditorModelHook } from "~/components/document/text/hooks/model";
import { EditorContainerHook } from "./container";
import { EditorSelectionHook } from "~/components/document/text/hooks/selection";

export type KeyboardBindingsMap = {
  [key: string]: KeyboardBinding[];
};

export type KeyboardBinding = {
  altKey?: boolean;
  shiftkey?: boolean;
  handler(event: KeyboardEvent): void;
};

export const useEditorKeyboard = (
  container: EditorContainerHook,
  model: EditorModelHook,
  selection: EditorSelectionHook
) => {
  const handleOnEnter = (event: KeyboardEvent) => {
    event.preventDefault();
    const range = model.getRangeAlteration();

    if (!range) {
      return;
    }

    if (range.collapsed) {
      const originAlteration = range.start.alteration;
      const content = originAlteration.content;
      const offset = range.start.offset;
      const startSubAlteration = model.sub(originAlteration, [0, offset]);
      const endSubAlteration = model.sub(originAlteration, [offset, content.length]);

      if (startSubAlteration) {
        model.replace(originAlteration, startSubAlteration);
      }

      if (endSubAlteration) {
        Object.assign(endSubAlteration, { breakline: true });
        model.insertAfter(endSubAlteration, originAlteration);
        selection.setCaret(endSubAlteration.node, 0);
      }
    }
  };

  const keyboardBindingsMap: KeyboardBindingsMap = {
    enter: [
      {
        altKey: false,
        shiftkey: false,
        handler: handleOnEnter,
      },
    ],
    default: [],
  };

  const match = (event: KeyboardEvent): KeyboardBinding | null => {
    const bindings = keyboardBindingsMap[event.key.toLowerCase()];
    if (!bindings || !bindings.length) {
      return null;
    }
    const binding = bindings.find(
      (_) => Boolean(_.altKey).valueOf() === event.altKey && Boolean(_.shiftkey).valueOf() === event.shiftKey
    );
    if (!binding) {
      return null;
    }
    return binding;
  };

  const handleOnKeydown = (event: KeyboardEvent) => {
    event.stopPropagation();
    const binding = match(event);
    if (binding) {
      binding.handler(event);
      return;
    }
    if (isCharacter(event.key)) {
      event.preventDefault();
      handleOnNormalKeydown(event);
    }
  };

  const handleOnNormalKeydown = (event: KeyboardEvent) => {
    const range = model.getRangeAlteration();

    if (!range) {
      return;
    }

    const character = event.key;

    if (range.collapsed) {
      const alteration = range.start.alteration;
      const offset = range.start.offset;
      const alterationNodeType = container.getAlterationNodeType(alteration.node);

      if (alterationNodeType === "br") {
        const span = container.createSpan(character);
        model.replace(alteration, {
          content: character,
          node: span,
          breakline: true,
          formats: alteration.formats,
        });
        model.format(alteration, alteration.formats);
        selection.setCaret(span, 1);
      } else {
        alteration.content = alteration.content.substring(0, offset) + character + alteration.content.substring(offset);
        alteration.node.innerText = alteration.content;
        const textNode = container.findTextNode(alteration.node);
        if (textNode) {
          selection.setCaret(textNode, offset + 1);
        }
      }
    }

    console.log(model.alterations());
  };
  const listen = () => {
    container.on("keydown", handleOnKeydown);
  };

  const destroy = () => {
    container.removeListener("keydown", handleOnKeydown);
  };

  return {
    listen,
    destroy,
  };
};

export type EditorKeyboardHook = ReturnType<typeof useEditorKeyboard>;
