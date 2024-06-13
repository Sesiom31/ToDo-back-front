import { faBars } from "@fortawesome/free-solid-svg-icons";
import AddTask from "./AddTask";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setClassLeft,
  setClassRight,
} from "../../../store/visibleSlice";
import DisplayTasks from "./DisplayTasks";
import IconButton from "../../../ui/IconButton";
import HeaderMain from "./HeaderMain";

function Main() {
  console.log("MAIN");
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);

  return (
    <main className="relative col-span-12 flex h-full flex-col items-start justify-start gap-4 bg-gray-700 md:static md:col-span-9  lg:col-span-6">
      <IconButton
        icon={faBars}
        htmlFor="open-aside"
        className="text-xl text-orange-500"
        classNameButton={`absolute top-8 left-4 md:hidden `}
        onClick={() => {
          dispatch(setClassLeft('a-open-left'));
          dispatch(setClassRight('a-right'));
        }}
      />
      <HeaderMain setIsOpenAddTask={setIsOpenAddTask} />

      {isOpenAddTask && (
        <AddTask setIsLoad={setIsLoad} setIsOpenAddTask={setIsOpenAddTask} />
      )}

      <section className="max-h-[calc(100%-9rem)] w-full overflow-y-auto p-4">
        <DisplayTasks isLoad={isLoad} setIsLoad={setIsLoad} />
      </section>
    </main>
  );
}

Main.propTypes = {};

export default Main;
