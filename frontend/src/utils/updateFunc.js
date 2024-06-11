import { setTasks, setCurrentTask } from "../store/taskSlice";
import {
  deleteTaskRequest,
  updateFieldTaskRequest,
  updateTaskRequest,
} from "../api/task.request";

/* funcion para los iconos complete e important */
export const updateField = async (field, newValue, dispatch, tasks, currentTask) => {
  const originalTasks = [...tasks];
  let newCurrentTask = { ...currentTask };

  try {
    const updatedTasks = tasks.map((task) => {
      if (task._id === currentTask._id) {
        if (field === "isImportant") {
          const oT = {
            isImportant: newValue,
            belongsCategories: newValue
              ? [...task.belongsCategories, "importantes"]
              : task.belongsCategories.filter((t) => t !== "importantes"),
          };

          newCurrentTask = { ...newCurrentTask, ...oT };

          return {
            ...task,
            ...oT,
          };
        } else if (field === "isComplete") {
          const oT = {
            isComplete: newValue,
            belongsCategories: newValue
              ? [...task.belongsCategories, "completadas"]
              : task.belongsCategories.filter((t) => t !== "completadas"),
          };

          newCurrentTask = { ...newCurrentTask, ...oT };

          return {
            ...task,
            ...oT,
          };
        } else {
          return {
            ...task,
            [field]: newValue,
          };
        }
      } else {
        return task;
      }
    });

    dispatch(setTasks(updatedTasks));
    dispatch(setCurrentTask(newCurrentTask));

    await updateFieldTaskRequest({
      taskId: currentTask._id,
      field,
      newValue,
    });
  } catch (err) {
    console.log(err);
    dispatch(setTasks(originalTasks));
    dispatch(setCurrentTask(currentTask));
  }
};

export const updateTask = async (tasks, currentTask, data, dispatch) => {
  const originalTasks = [...tasks];
  const originalCurrentTask = { ...currentTask };

  const newCurrentTask = {
    ...currentTask,
    ...data,
    dateEnd: data.dateEnd.toISOString(),
  };

  const newTasks = tasks.map((t) => {
    if (t._id === currentTask._id) return newCurrentTask;
    else return t;
  });

  try {
    dispatch(setCurrentTask(newCurrentTask));
    dispatch(setTasks(newTasks));
    await updateTaskRequest(newCurrentTask);
  } catch (err) {
    dispatch(setCurrentTask(originalCurrentTask));
    dispatch(setTasks(originalTasks));
    console.log(err);
  }
};

export const deleteTask = async (tasks, currentTask, dispatch) => {
  const originalTasks = [...tasks];
  const originalCurrentTask = { ...currentTask };

  const newTasks = [...tasks.filter((t) => t._id !== currentTask._id)];

  try {
    dispatch(setTasks(newTasks));
    dispatch(setCurrentTask({}));
    await deleteTaskRequest(currentTask._id);
  } catch (err) {
    dispatch(setTasks(originalTasks));
    dispatch(setCurrentTask(originalCurrentTask));
    console.log(err);
  }
};
