import { combineReducers } from "@reduxjs/toolkit";
import userState from "./userSlice";
import documentState from "./documentSlice";

const appReducers = combineReducers({ userState, documentState });

export default appReducers;
