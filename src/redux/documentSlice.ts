import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataRender } from "~/types/document";
import { transformRenderData } from "~/utils/document";
import cloneDeep from "lodash/cloneDeep";

export interface DocumentState {
  initialDataRender: DataRender[];
  dataRender: DataRender[];
}

const initialState: DocumentState = {
  initialDataRender: [],
  dataRender: [],
};

const slice = createSlice({
  name: "documentState",
  initialState,
  reducers: {
    initDataRender(state, { payload }: PayloadAction<{data: DataRender[]}>) {
      const dataRender = transformRenderData(cloneDeep(payload.data));
      state.initialDataRender = dataRender;
      state.dataRender = dataRender;
    }
  }
});

export const { initDataRender } = slice.actions;

export default slice.reducer;
