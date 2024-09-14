import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice.js";
import userslice from "./userslice.js";

const reducer = combineReducers({
  tasks: tasksSlice,
  user: userslice,
});

const store = configureStore({
  reducer,
});

export default store;
