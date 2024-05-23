import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    isLoading: false,
    token: null,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },

    endLoading: (state) => {
      state.isLoading = false;
    },
    startLogin: (state, action) => {
      state.token = action.payload;
    },

    endLogin: (state) => {
      state.token = null;
      state.isLoading = false;
    },
  },
});

export const { startLoading, endLoading, startLogin, endLogin } =
  authSlice.actions;
export default authSlice.reducer;
