import { combineReducers } from "@reduxjs/toolkit";
import userState from "./userSlice";

const appReducers = combineReducers({ userState });

export default appReducers;
