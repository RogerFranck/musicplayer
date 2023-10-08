import { configureStore } from "@reduxjs/toolkit";
import playListReducer from "./context/playListSlice"

export const store = configureStore({
  reducer: {
    playListReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
