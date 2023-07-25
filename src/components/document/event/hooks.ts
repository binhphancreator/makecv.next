import { useEffect, useRef, useState } from "react";
import { DocumentEventMap } from "./map";
import emitter from ".";

export const useDocumentEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (arg: DocumentEventMap[K]) => any
) => {
  const [event, changeEvent] = useState<DocumentEventMap[K] | null>(null);
  const dispatchEventRef = useRef((e: DocumentEventMap[K]) => changeEvent(e));

  useEffect(() => {
    emitter.on(type, dispatchEventRef.current);
    return () => emitter.off(type, dispatchEventRef.current);
  }, []);

  useEffect(() => {
    if (event) {
      listener(event);
    }
  }, [event]);

  const on = () => emitter.on(type, dispatchEventRef.current);
  const off = () => emitter.off(type, dispatchEventRef.current);

  return { on, off };
};
