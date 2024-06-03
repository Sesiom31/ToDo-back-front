import { setTasks } from "../store/taskSlice";
import { updateFieldTaskRequest } from "../api/task.request";

export const updateField = async (taskId, field, newValue, dispatch, tasks) => {
  const originalTasks = [...tasks];
  console.log(taskId, field, newValue);

  try {
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        if (field === "isImportant") {
          return {
            ...task,
            isImportant: newValue,
            belongsCategories: newValue
              ? [...task.belongsCategories, "importantes"]
              : task.belongsCategories.filter((t) => t !== "importantes"),
          };
        } else if (field === "isComplete") {
          return {
            ...task,
            isComplete: newValue,
            belongsCategories: newValue
              ? [...task.belongsCategories, "completadas"]
              : task.belongsCategories.filter((t) => t !== "completadas"),
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
    const res = await updateFieldTaskRequest({ taskId, field, newValue });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch(setTasks(originalTasks));
  }
};
