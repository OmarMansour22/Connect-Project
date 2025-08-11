import { AuthSliceInitState } from "@/Interfaces/authSliceInitState";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: AuthSliceInitState = {
  isLoggedIn: !!Cookies.get("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUserIsLoggedIn } = authSlice.actions;
