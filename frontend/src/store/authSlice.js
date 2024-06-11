import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    spinner: false,
    authenticated: false,
  },
  reducers: {
    playSpinner: (state) => {
      state.isLoading = true;
    },

    stopSpinner: (state) => {
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

export const { playSpinner, stopSpinner, startLogin, endLogin, setUser, clearUser } =
  authSlice.actions;

export const getUser = (state) => state.auth.user;
export const getSpinner = (state) => state.auth.spinner;
export const isAuthenticated = (state) => state.auth.authenticated;

export default authSlice.reducer;
