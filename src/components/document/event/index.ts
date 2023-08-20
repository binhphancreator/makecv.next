import { DocumentEventMap } from "~/components/document/event/map";
import EventEmitter from "eventemitter3";

const e2 = new EventEmitter();

const on = <K extends keyof DocumentEventMap>(type: K, listener: (event: DocumentEventMap[K]) => any) => {
  e2.on(type, listener);
};

const off = <K extends keyof DocumentEventMap>(type: K, listener: (event: DocumentEventMap[K]) => any) => {
  e2.off(type, listener);
};

const dispatch = <K extends keyof DocumentEventMap>(type: K, event: DocumentEventMap[K]) => {
  e2.emit(type, event);
};

const removeAll = <K extends keyof DocumentEventMap>(type: K) => {
  e2.removeAllListeners(type);
};

const emitter = {
  on,
  off,
  dispatch,
  removeAll,
};

export default emitter;
