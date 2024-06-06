import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddTask from "./AddTask";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getCurrentCategory,
  getSearch,
  getTasks,
} from "../../../store/taskSlice";
import { capitalizeCategory, dateFormat } from "../../../utils/configString";
import PropTypes from "prop-types";
import DisplayTasks from "./DisplayTasks";
import ButtonAdd from "../../../ui/ButtonAdd";

function Main({ setIsLoad }) {
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);

  const tasks = useSelector(getTasks);
  const search = useSelector(getSearch);
  const currentCategory = useSelector(getCurrentCategory);

  const tasksDisplay = tasks.filter((task) => {
    if (search !== "")
      return (
        task.belongsCategories.includes(currentCategory) &&
        (task.task.includes(search) || task.description.includes(search))
      );
    return task.belongsCategories.includes(currentCategory);
  });

  const categorieNoCreate = ["importantes", "completadas"];

  return (
    <main
      className=" bg-gray-700 col-span-7  flex flex-col gap-4 items-start h-full border-l border-l-gray-300
      border-r border-r-gray-300
    "
    >
      <section
        className={`w-full h-36 py-4 ${
          categorieNoCreate.includes(currentCategory) && "h-24"
        } `}
      >
        <h2 className="text-5xl px-4">{capitalizeCategory(currentCategory)}</h2>
        <span className="px-4">
          {dateFormat(new Date(), " iiii',' d 'de' MMMM")}
        </span>

        <div className="w-full px-4">
          {!categorieNoCreate.includes(currentCategory) && (
            <ButtonAdd
              name="Agregar una nueva tarea"
              icon={faPlus}
              classNameButton="bg-[#FF7F50] border border-[#FF7F50] rounded-md p-2 px-4 w-full h-11 text-[#00003d] text-base my-4 flex justify-between items-center"
              classNameIcon=" text-base w-[18px]"
              onClick={() => setIsOpenAddTask(true)}
            />
          )}
        </div>
      </section>

      {isOpenAddTask && (
        <AddTask onAddTask={setIsOpenAddTask} setIsLoad={setIsLoad} />
      )}

      <section className="w-full max-h-[calc(100%-9rem)] overflow-y-auto  p-4 ">
        <DisplayTasks tasksDisplay={tasksDisplay} />
      </section>
    </main>
  );
}

Main.propTypes = {
  setIsLoad: PropTypes.func.isRequired,
};

export default Main;
