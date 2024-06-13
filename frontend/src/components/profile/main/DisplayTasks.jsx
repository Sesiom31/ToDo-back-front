import PropTypes from "prop-types";
import ListTask from "./ListTask";
import { useSelector, useDispatch } from "react-redux";
import {
  setTasks,
  getTasks,
  getSearch,
  getCurrentCategory,
} from "../../../store/taskSlice";
import { useEffect } from "react";
import { getAllTasksRequest } from "../../../api/task.request";

function DisplayTasks({ isLoad, setIsLoad }) {
  const tasks = useSelector(getTasks);
  const search = useSelector(getSearch);
  const currentCategory = useSelector(getCurrentCategory);
  const dispatch = useDispatch();

  const tasksDisplay = tasks.filter((task) => {
    if (search !== "")
      return (
        task.belongsCategories.includes(currentCategory) &&
        (task.task.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()))
      );
    return task.belongsCategories.includes(currentCategory);
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const originalTasks = [...tasks];
      try {
        console.log("TRAER TODAS LAS TAREAS DESDE LA BD");
        const res = await getAllTasksRequest();
        dispatch(setTasks(await res.tasks));
      } catch (err) {
        dispatch(setTasks(originalTasks));
        console.log(err);
      } finally {
        setIsLoad(false);
      }
    };

    if (isLoad) {
      fetchTasks();
    }
  }, [isLoad, setIsLoad, dispatch, tasks]);

  return (
    <ul className="flex w-full flex-col gap-2">
      {!tasksDisplay.length ? (
        <h3>No hay ninguna tarea</h3>
      ) : (
        tasksDisplay.map((task) => <ListTask key={task._id || task.id_f} task={task} />)
      )}
    </ul>
  );
}

DisplayTasks.propTypes = {
  isLoad: PropTypes.bool.isRequired,
  setIsLoad: PropTypes.func.isRequired,
};

export default DisplayTasks;
