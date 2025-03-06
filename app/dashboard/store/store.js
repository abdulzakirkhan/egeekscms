import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import jobReducer from "./jobSlice";
import eventReducer from "./eventSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    jobs:jobReducer,
    events:eventReducer,
  },
});
