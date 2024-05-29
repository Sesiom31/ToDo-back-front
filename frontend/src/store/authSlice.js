import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    isLoading: false,
    authenticated: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },

    endLoading: (state) => {
      state.isLoading = false;
    },

    startLogin: (state) => {
      state.authenticated = true;
    },

    endLogin: (state) => {
      state.authenticated = false;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = "";
    },
  },
});

export const {
  startLoading,
  endLoading,
  startLogin,
  endLogin,
  setUser,
  clearUser,
} = authSlice.actions;

export const getUser = (state) => state.auth.user;
export const isLoading = (state) => state.auth.isLoading;
export const isAuthenticated = (state) => state.auth.authenticated;

export default authSlice.reducer;
