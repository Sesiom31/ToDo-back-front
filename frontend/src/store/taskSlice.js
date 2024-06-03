import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    currentTask: {},
    categories: [],
    currentCategory: 'hoy',
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
    
    setCurrentCategory :(state, action) =>{
      state.currentCategory = action.payload
    }
  },
});

export const getTasks = (state) => state.tasks.tasks;
export const getCurrentTask = (state) => state.tasks.currentTask;
export const getCategories = state => state.tasks.categories
export const getCurrentCategory= state => state.tasks.currentCategory

export const { setTasks, setCurrentTask, setCategories, setCurrentCategory } = tasksSlice.actions;

export default tasksSlice.reducer;
