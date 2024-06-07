import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tasksReducer from "./taskSlice";
import visibleReducer from "./visibleSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    visible: visibleReducer,
  },
});
