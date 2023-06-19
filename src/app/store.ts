import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: userReducer,
});

//公式リファレンス通りに記述
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
