import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tasksReducer from "./taskSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});
