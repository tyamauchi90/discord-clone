import channelReducer from "../features/channelSlice";
import userReducer from "../features/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
  },
});

//公式リファレンス通りに記述
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
