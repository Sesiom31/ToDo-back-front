import {
  faCircleCheck,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTask from "./AddTask";
import { useState } from "react";
import { updateFieldTaskRequest } from "../../../api/task.request";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentCategory,
  getTasks,
  setCurrentTask,
  setTasks,
} from "../../../store/taskSlice";
import { capitalizeCategory, dateFormat } from "../../../utils/configString";
import PropTypes from "prop-types";

function Main({ setIsLoad }) {
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);

  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const currentCategory = useSelector(getCurrentCategory);

  const tasksDisplay = tasks.filter((task) =>
    task.belongsCategories.includes(currentCategory)
  );

  const updateField = async (taskId, field, newValue) => {
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

  console.log(tasks);

  return (
    <main
      className=" bg-gray-700 col-span-7  flex flex-col gap-4 items-start h-full border-l border-l-gray-300
      border-r border-r-gray-300
    "
    >
      <section className="w-full h-36 py-4">
        <h2 className="text-5xl px-4">{capitalizeCategory(currentCategory)}</h2>
        <span className="px-4">
          {dateFormat(new Date(), " iiii',' d 'de' MMMM")}
        </span>

        <div className="w-full px-4">
          <button
            className=" bg-[#FF7F50] border border-[#FF7F50] rounded-md p-2 px-4 w-full h-11 text-[#00003d] text-base my-4 flex justify-between items-center "
            onClick={() => setIsOpenAddTask(true)}
          >
            <h3>Agregar una nueva tarea </h3>
            <FontAwesomeIcon icon={faPlus} className=" text-base w-[18px]" />
          </button>
        </div>
      </section>

      {isOpenAddTask && (
        <AddTask onAddTask={setIsOpenAddTask} setIsLoad={setIsLoad} />
      )}

      <section className="w-full max-h-[calc(100%-9rem)] overflow-y-auto  p-4 ">
        <ul className="flex flex-col gap-2 w-full">
          {!tasksDisplay.length ? (
            <h3>No hay ninguna tarea</h3>
          ) : (
            tasksDisplay.map((t, i) => (
              <li
                className="bg-gray-800 border-none ring-1 ring-sky-500 rounded-md p-2 py-3 w-full  flex justify-between items-center hover:bg-gray-600 "
                key={i}
                onClick={() => {
                  dispatch(setCurrentTask(t));
                }}
              >
                <div className="flex justify-between items-center gap-4 pl-2 ">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      updateField(t._id, "isComplete", !t.isComplete);
                    }}
                  >
                    <label htmlFor="complete" className="cursor-pointer">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={`${
                          t.isComplete ? "text-orange-500" : "text-gray-400"
                        }  text-xs`}
                      />
                    </label>
                  </div>

                  <div>
                    <h3 className="text-[1.1rem">
                      {capitalizeCategory(t.task)}
                    </h3>
                    <p>
                      Detalles:{" "}
                      {capitalizeCategory(t.description.substring(0, 30))}
                      {t.description.length > 30 && " ..."}
                    </p>
                    <span className="text-[0.8rem] text-gray-400">
                      completar hasta el{" "}
                      {dateFormat(t.dateEnd, " iiii dd 'de' MMMM 'del' yyyy")}
                    </span>
                  </div>
                </div>

                <div
                  className="flex justify-center items-center pr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateField(t._id, "isImportant", !t.isImportant);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    className={`${
                      t.isImportant ? "text-orange-500" : "text-gray-400"
                    } cursor-pointer`}
                  />
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  setIsLoad: PropTypes.func.isRequired,
};

export default Main;
