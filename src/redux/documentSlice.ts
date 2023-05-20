import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataRender, Position } from "~/types/document";
import { calcNewPositionAfterScale, generateKey, recursiveForeach, transformRenderData } from "~/utils/document";
import cloneDeep from "lodash/cloneDeep";

export interface DocumentState {
  initialDataRender: DataRender[];
  flatDataRender: {[key: string]: DataRender};
  viewport: {
    scale: number,
    scrollSpeed: number,
    scaleSpeed: number,
    position: Position,
  },
  colorPalettes: string[],
  hoveringKeys: string[],
  selectingKeys: string[]
}

const initialState: DocumentState = {
  initialDataRender: [],
  flatDataRender: {},
  viewport: {
    scale: 1,
    scrollSpeed: 0.5,
    scaleSpeed: 0.007,
    position: {
      x: 0,
      y: 0,
    },
  },
  colorPalettes: [
    "#000000",
    "#262A56",
    "#B8621B",
    "#E3CCAE",
  ],
  hoveringKeys: [],
  selectingKeys: [],
};

const slice = createSlice({
  name: "documentState",
  initialState,
  reducers: {
    initDataRender(state, { payload }: PayloadAction<{data: DataRender[]}>) {
      state.initialDataRender = cloneDeep(payload.data);
      transformRenderData(state.initialDataRender);
      state.flatDataRender = {};
      recursiveForeach(state.initialDataRender, (_) => {
        state.flatDataRender[_.key ?? ""] = _;
      });
    },
    setPositionComponentByKey(state, { payload }: PayloadAction<{key: string, position: Position}>) {
      if (state.flatDataRender[payload.key]) {
        state.flatDataRender[payload.key].position = payload.position;
      }
    },
    setViewportScale(state, { payload }: PayloadAction<{scale: number}>) {
      state.viewport.scale = payload.scale;
    },
    setViewportPosition(state, { payload }: PayloadAction<{position: Position}>) {
      state.viewport.position = payload.position;
    },
    reupdateAfterTouchEnd(state, { payload }: PayloadAction<{scale: number, originPosition: Position}>) {
      const newViewportPosition = calcNewPositionAfterScale(state.viewport.position, payload.originPosition, payload.scale);
      const deltaViewportPosition: Position = {
        x: newViewportPosition.x - state.viewport.position.x,
        y: newViewportPosition.y - state.viewport.position.y
      };
      for (let key in state.flatDataRender) {
        const _ = state.flatDataRender[key];
        if (_ && _.position) {
          const newPosition = calcNewPositionAfterScale({ x: _.position.x + state.viewport.position.x, y: _.position.y + state.viewport.position.y }, payload.originPosition, payload.scale);
          _.position = {
            x: _.position.x + (newPosition.x - _.position.x - state.viewport.position.x) - deltaViewportPosition.x,
            y: _.position.y + (newPosition.y - _.position.y - state.viewport.position.y) - deltaViewportPosition.y,
          };
        }
      }
      state.viewport.scale = state.viewport.scale * payload.scale;
      state.viewport.position = newViewportPosition;
    },
    addHoveringKey(state, { payload }: PayloadAction<{key?: string}>) {
      if (!payload.key || !payload.key.length)
        return;
      if (!state.hoveringKeys.includes(payload.key)) {
        state.hoveringKeys = [...state.hoveringKeys, payload.key];
      }
    },
    removeHoveringKey(state, { payload }: PayloadAction<{key?: string}>) {
      if (!payload.key || !payload.key.length)
        return;
      if (state.hoveringKeys.includes(payload.key)) {
        state.hoveringKeys = state.hoveringKeys.filter((key) => key !== payload.key);
      }
    },
    addSelectingKey(state, { payload }: PayloadAction<{key?: string}>) {
      if (!payload.key || !payload.key.length)
        return;
      if (!state.selectingKeys.includes(payload.key)) {
        state.selectingKeys = [...state.selectingKeys, payload.key];
      }
    },
    removeSelectingKey(state, { payload }: PayloadAction<{key?: string}>) {
      if (!payload.key || !payload.key.length)
        return;
      if (state.selectingKeys.includes(payload.key)) {
        state.selectingKeys = state.selectingKeys.filter((key) => key !== payload.key);
      }
    },
    refreshSelectingKeys(state) {
      state.selectingKeys = [];
    }
  }
});

export const {
  initDataRender,
  setPositionComponentByKey,
  setViewportScale,
  setViewportPosition,
  reupdateAfterTouchEnd,
  addHoveringKey,
  removeHoveringKey,
  addSelectingKey,
  removeSelectingKey,
  refreshSelectingKeys
} = slice.actions;

export default slice.reducer;
