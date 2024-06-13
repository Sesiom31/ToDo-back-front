import { createSlice } from "@reduxjs/toolkit";

const visibleSlice = createSlice({
  name: "visible",
  initialState: { classLeft: "a-left", classRight: "a-right" },
  reducers: {
    setClassLeft: (state, action) => {
      state.classLeft = action.payload;
    },
    setClassRight: (state, action) => {
      state.classRight = action.payload;
    },
  },
});

export const getClassLeft = (state) => state.visible.classLeft;
export const getClassRight = (state) => state.visible.classRight;

export const { setClassLeft, setClassRight } = visibleSlice.actions;
export default visibleSlice.reducer;
