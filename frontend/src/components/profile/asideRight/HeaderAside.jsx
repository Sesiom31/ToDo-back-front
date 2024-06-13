import IconButton from "../../../ui/IconButton";
import { faCircleArrowRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteTask } from "../../../utils/updateFunc";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentTask, getTasks } from "../../../store/taskSlice";
import { setClassRight } from "../../../store/visibleSlice";
import { useEffect, useState } from "react";

function HeaderAside() {
  const [isLg, setIsLg] = useState(false);
  const tasks = useSelector(getTasks);
  const currentTask = useSelector(getCurrentTask);
  const dispatch = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width:1024px)");
    const handleMediaQuery = (e) => {
      setIsLg(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQuery);
    setIsLg(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, []);

  return (
    <div className="absolute top-0 z-[220] flex h-14 w-full justify-between bg-gray-800 px-3 py-1 sm:pr-8 sm:pl-8 lg:justify-end">
      <IconButton
        icon={faCircleArrowRight}
        htmlFor="close-aside-right"
        className="text-xl text-gray-400"
        classNameButton={"lg:hidden "}
        onClick={() => {
          dispatch(setClassRight("a-right"));
        }}
      />

      <IconButton
        icon={faTrashCan}
        htmlFor="delete-task"
        className="text-base text-orange-500 hover:text-orange-300"
        title="Eliminar tarea"
        onClick={() => {
          deleteTask(tasks, currentTask, dispatch);
          if (!isLg) {
            dispatch(setClassRight("a-right"));
          }
        }}
      />
    </div>
  );
}

export default HeaderAside;
