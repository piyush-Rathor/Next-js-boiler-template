import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  isLogin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      if (!action.payload) {
        state.email = null;
        state.isLogin = null;
        return;
      }
      state.email = action.payload.email;
      state.isLogin = action.payload.isLogin;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
