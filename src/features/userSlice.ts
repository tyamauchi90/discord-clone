import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "../Types";

const initialState: initialUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});
console.log(userSlice);

export default userSlice.reducer;
