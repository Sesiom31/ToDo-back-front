import IconButton from "../../../ui/IconButton";
import { faCircleArrowRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteTask } from "../../../utils/updateFunc";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentTask, getTasks } from "../../../store/taskSlice";
import { setAsideRightIsVisible } from "../../../store/visibleSlice";

function HeaderAside() {
  const tasks = useSelector(getTasks);
  const currentTask = useSelector(getCurrentTask);
  const dispatch = useDispatch();

  return (
    <div className="absolute top-0 z-[220] flex h-14 w-full justify-between bg-gray-800 px-3 py-1 sm:pr-12 lg:justify-end">
      <IconButton
        icon={faCircleArrowRight}
        htmlFor="close-aside-right"
        className="text-xl text-gray-400"
        classNameButton={"lg:hidden "}
        onClick={() => {
          dispatch(setAsideRightIsVisible(false));
        }}
      />

      <IconButton
        icon={faTrashCan}
        htmlFor="delete-task"
        className="text-base text-orange-500 hover:text-orange-300"
        title="Eliminar tarea"
        onClick={() => {
          dispatch(setAsideRightIsVisible(false));
          deleteTask(tasks, currentTask, dispatch);
        }}
      />
    </div>
  );
}

export default HeaderAside;
