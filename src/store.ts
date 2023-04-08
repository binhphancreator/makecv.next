import { configureStore } from "@reduxjs/toolkit";
import appReducers from "./redux";

export function makeStore() {
  return configureStore({
    reducer: appReducers
  });
}

const store = makeStore();

export type AppSelector = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
