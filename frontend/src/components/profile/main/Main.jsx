import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddTask from "./AddTask";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentCategory, getSearch, getTasks } from "../../../store/taskSlice";
import {
  getAsideLeftIsVisible,
  setAsideLeftIsVisible,
  setAsideRightIsVisible,
} from "../../../store/visibleSlice";
import { capitalizeCategory, dateFormat } from "../../../utils/configString";
import PropTypes from "prop-types";
import DisplayTasks from "./DisplayTasks";
import ButtonAdd from "../../../ui/ButtonAdd";
import IconButton from "../../../ui/IconButton";

function Main({ setIsLoad }) {
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);

  const tasks = useSelector(getTasks);
  const search = useSelector(getSearch);
  const currentCategory = useSelector(getCurrentCategory);
  const asideLeftIsVisible = useSelector(getAsideLeftIsVisible);

  const dispatch = useDispatch();

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
    <main className="relative col-span-12 flex h-full flex-col items-start gap-4 bg-gray-700 md:col-span-9 lg:col-span-6">
      <IconButton
        icon={faBars}
        htmlFor="open-aside"
        className="text-xl text-orange-500"
        classNameButton={`absolute top-8 left-4 lg:hidden ${
          asideLeftIsVisible && "hidden"
        }`}
        onClick={() => {
          dispatch(setAsideRightIsVisible(false));
          dispatch(setAsideLeftIsVisible(true));
        }}
      />
      <section
        className={`h-36 w-full py-4 ${
          categorieNoCreate.includes(currentCategory) && "h-20"
        } `}
      >
        <div className={`${!asideLeftIsVisible && "ml-8"}`}>
          <h2 className="px-4 text-5xl">{capitalizeCategory(currentCategory)}</h2>
          <span className="px-4">{dateFormat(new Date(), " iiii',' d 'de' MMMM")}</span>
        </div>

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

      {isOpenAddTask && <AddTask onAddTask={setIsOpenAddTask} setIsLoad={setIsLoad} />}

      <section className="max-h-[calc(100%-9rem)] w-full overflow-y-auto p-4">
        <DisplayTasks tasksDisplay={tasksDisplay} />
      </section>
    </main>
  );
}

Main.propTypes = {
  setIsLoad: PropTypes.func.isRequired,
};

export default Main;
