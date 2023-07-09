import { EditorContainerHook } from "./container";

export type KeyboardBindingsMap = {
  [key: string]: KeyboardBinding[];
};

export type KeyboardBinding = {
  altKey?: boolean;
  shiftkey?: boolean;
  handler(event: KeyboardEvent): void;
};

export const useEditorKeyboard = (container: EditorContainerHook) => {
  const keyboardBindingsMap: KeyboardBindingsMap = {
    enter: [
      {
        altKey: false,
        shiftkey: false,
        handler: (event) => {
          console.log(event, "hihi");
        },
      },
    ],
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
      event.preventDefault();
      binding.handler(event);
      return;
    }
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
