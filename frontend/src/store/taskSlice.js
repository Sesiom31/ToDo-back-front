import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    currentTask: {},
    categories: [],
    currentCategory: "hoy",
    search: "",
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const getTasks = (state) => state.tasks.tasks;
export const getCurrentTask = (state) => state.tasks.currentTask;
export const getCategories = (state) => state.tasks.categories;
export const getCurrentCategory = (state) => state.tasks.currentCategory;
export const getSearch = (state) => state.tasks.search;

export const { setTasks, setCurrentTask, setCategories, setCurrentCategory, setSearch } =
  tasksSlice.actions;

export default tasksSlice.reducer;
