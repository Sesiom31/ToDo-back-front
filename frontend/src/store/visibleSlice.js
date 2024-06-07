import { createSlice } from "@reduxjs/toolkit";

const visibleSlice = createSlice({
  name: "visible",
  initialState: { asideLeftIsVisible: false, asideRightIsVisible: false },
  reducers: {
    setAsideLeftIsVisible: (state, action) => {
      state.asideLeftIsVisible = action.payload;
    },
    setAsideRightIsVisible: (state, action) => {
      state.asideRightIsVisible = action.payload;
    },
  },
});

export const getAsideLeftIsVisible = (state) => state.visible.asideLeftIsVisible;
export const getAsideRightIsVisible = (state) => state.visible.asideRightIsVisible;

export const { setAsideLeftIsVisible, setAsideRightIsVisible } = visibleSlice.actions;
export default visibleSlice.reducer;
