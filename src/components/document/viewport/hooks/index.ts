import { useEffect, useRef } from "react";
import emitter from "~/components/document/event";
import { useAppDispatch } from "~/hooks/app";
import { setViewportBoundingSize } from "~/redux/documentSlice";

export const useDocumentViewport = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initBoundingSize();

    ref.current?.addEventListener("wheel", onWheel);
    ref.current?.addEventListener("contextmenu", onContextMenu);

    return () => {
      ref.current?.removeEventListener("wheel", onWheel);
      ref.current?.removeEventListener("contextmenu", onContextMenu);
    };
  }, []);

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (e.ctrlKey) {
      emitter.dispatch("viewport.scale", e);
    } else {
      emitter.dispatch("viewport.scroll", e);
    }
  };

  const onContextMenu = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const initBoundingSize = () => {
    if (!ref.current) {
      return;
    }

    const boundingClientRect = ref.current.getBoundingClientRect();
    dispatch(
      setViewportBoundingSize({
        boundingSize: {
          width: boundingClientRect.width,
          height: boundingClientRect.height,
        },
      })
    );
  };

  return {
    ref,
  };
};
