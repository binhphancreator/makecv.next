import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataRender, Position } from "~/types/document";
import { ViewportStatusEnum } from "~/types/viewport";
import { recursiveForeach, transformRenderData } from "~/utils/document";
import cloneDeep from "lodash/cloneDeep";
import {
  DEFAULT_HEIGHT_TOP_MENU,
  MIN_WIDTH_LAYER_MENU,
  DEFAULT_SCALE_SPEED_VIEWPORT,
  DEFAULT_SCALE_VIEWPORT,
} from "~/constants/document";

export interface DocumentState {
  initialDataRender: DataRender[];
  flatDataRender: { [key: string]: DataRender };
  viewport: {
    scale: number;
    scrollSpeed: number;
    scaleSpeed: number;
    position: Position;
    heightTopMenu: number;
    widthLayerMenu: number;
    tabActiveIndexLayerMenu: number;
    status: ViewportStatusEnum;
  };
  colorPalettes: string[];
  hoveringKeys: string[];
  selectingKeys: string[];
  editingKeys: string[];
}

const initialState: DocumentState = {
  initialDataRender: [],
  flatDataRender: {},
  viewport: {
    scale: DEFAULT_SCALE_VIEWPORT,
    scrollSpeed: 0.5,
    scaleSpeed: DEFAULT_SCALE_SPEED_VIEWPORT,
    heightTopMenu: DEFAULT_HEIGHT_TOP_MENU,
    widthLayerMenu: MIN_WIDTH_LAYER_MENU,
    tabActiveIndexLayerMenu: 0,
    position: {
      x: 0,
      y: 0,
    },
    status: ViewportStatusEnum.Idle,
  },
  colorPalettes: ["#000000", "#262A56", "#B8621B", "#E3CCAE"],
  hoveringKeys: [],
  selectingKeys: [],
  editingKeys: [],
};

const slice = createSlice({
  name: "documentState",
  initialState,
  reducers: {
    initDataRender(state, { payload }: PayloadAction<{ data: DataRender[] }>) {
      state.initialDataRender = cloneDeep(payload.data);
      transformRenderData(state.initialDataRender);
      state.flatDataRender = {};
      recursiveForeach(state.initialDataRender, (_) => {
        state.flatDataRender[_.key ?? ""] = _;
      });
    },
    setPositionComponentByKey(state, { payload }: PayloadAction<{ key: string; position: Position }>) {
      if (state.flatDataRender[payload.key]) {
        state.flatDataRender[payload.key].position = payload.position;
      }
    },
    setViewportScale(state, { payload }: PayloadAction<{ scale: number }>) {
      state.viewport.scale = payload.scale;
    },
    setViewportPosition(state, { payload }: PayloadAction<{ position: Position }>) {
      state.viewport.position = payload.position;
    },
    setWidthLayerMenu(state, { payload }: PayloadAction<{ width: number }>) {
      state.viewport.widthLayerMenu = payload.width;
    },
    setTabActiveIndexLayerMenu(state, { payload }: PayloadAction<{ tabIndex: number }>) {
      state.viewport.tabActiveIndexLayerMenu = payload.tabIndex;
    },
    addHoveringKey(state, { payload }: PayloadAction<{ key?: string }>) {
      if (!payload.key || !payload.key.length) return;
      if (!state.hoveringKeys.includes(payload.key)) {
        state.hoveringKeys = [...state.hoveringKeys, payload.key];
      }
    },
    removeHoveringKey(state, { payload }: PayloadAction<{ key?: string }>) {
      if (!payload.key || !payload.key.length) return;
      if (state.hoveringKeys.includes(payload.key)) {
        state.hoveringKeys = state.hoveringKeys.filter((key) => key !== payload.key);
      }
    },
    addSelectingKey(state, { payload }: PayloadAction<{ key?: string }>) {
      if (!payload.key || !payload.key.length) return;
      if (!state.selectingKeys.includes(payload.key)) {
        state.selectingKeys = [...state.selectingKeys, payload.key];
      }
    },
    removeSelectingKey(state, { payload }: PayloadAction<{ key?: string }>) {
      if (!payload.key || !payload.key.length) return;
      if (state.selectingKeys.includes(payload.key)) {
        state.selectingKeys = state.selectingKeys.filter((key) => key !== payload.key);
      }
    },
    addEditingKey(state, { payload }: PayloadAction<{ key?: string }>) {
      if (!payload.key || !payload.key.length) return;
      if (!state.editingKeys.includes(payload.key)) {
        state.editingKeys = [...state.editingKeys, payload.key];
      }
    },
    removeEditingKey(state, { payload }: PayloadAction<{ key?: string }>) {
      if (!payload.key || !payload.key.length) return;
      if (state.editingKeys.includes(payload.key)) {
        state.editingKeys = state.editingKeys.filter((key) => key !== payload.key);
      }
    },
    refreshSelectingKeys(state) {
      state.selectingKeys = [];
    },
    setViewportStatus(state, { payload }: PayloadAction<{ status: ViewportStatusEnum }>) {
      state.viewport.status = payload.status;
    },
  },
});

export const {
  initDataRender,
  setPositionComponentByKey,
  setViewportScale,
  setViewportPosition,
  addHoveringKey,
  removeHoveringKey,
  addSelectingKey,
  removeSelectingKey,
  refreshSelectingKeys,
  setWidthLayerMenu,
  setTabActiveIndexLayerMenu,
  setViewportStatus,
  addEditingKey,
  removeEditingKey,
} = slice.actions;

export default slice.reducer;
