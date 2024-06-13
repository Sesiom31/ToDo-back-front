import { setTasks, setCurrentTask } from "../store/taskSlice";
import {
  deleteTaskRequest,
  updateFieldTaskRequest,
  updateTaskRequest,
} from "../api/task.request";

/* funcion para los iconos complete e important */
/* export const updateField = async (field, newValue, dispatch, tasks, currentTask) => {
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
}; */


// guardar la tarea despues de editarla
export const updateTask = async (tasks, currentTask, data, dispatch) => {
  const originalTasks = [...tasks];
  const originalCurrentTask = { ...currentTask };
  console.log(data)
  const newCurrentTask = {
    ...currentTask,
    ...data,
    dateEnd: data.dateEnd.toISOString(),
    pasos : [...data.pasos.filter(p =>p.description !== '')]
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

// elimina la tarea
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


// crea nuevas propiedades cuando se usa los iconos completo e importante
const newProperties = (task, field, newValue) => {
  return {
    [field]: newValue,
    belongsCategories: newValue
      ? [
          ...task.belongsCategories,
          field === "isImportant" ? "importantes" : "completadas",
        ]
      : task.belongsCategories.filter(
          (c) => c !== (field === "isImportant" ? "importantes" : "completadas"),
        ),
  };
};

// función en uso
export const updateIconsListTask = async (
  tasks,
  task,
  field,
  newValue,
  dispatch,
) => {
  const originalTasks = [...tasks];
  const id = task._id;

  const newTasks = tasks.map((t) => {
    return t._id === id ? { ...task, ...newProperties(task, field, newValue) } : t;
  });

  try {
   /*  if (currentTask._id === task._id) {
      console.log('LOS IDS SON IGUALES')
      dispatch(
        setCurrentTask({ ...currentTask, ...newProperties(task, field, newValue) }),
      );
    } */
    dispatch(setTasks(newTasks));
    await updateFieldTaskRequest({ taskId: task._id, field, newValue });
  } catch (err) {
    dispatch(setTasks(originalTasks));
    console.log(err);
  }
};

/* export const updateDateEnd = async (taskId, tasks, newValue, dispatch) => {
  const currentTask = tasks.find((t) => t._id === taskId);

  const newTasks = tasks.map((t) => {
    return t._id === taskId ? { ...currentTask, dateEnd: newValue } : t;
  });

  dispatch(setTasks(newTasks));
}; */
