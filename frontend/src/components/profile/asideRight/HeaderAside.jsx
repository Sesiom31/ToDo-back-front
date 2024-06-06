import IconButton from "../../../ui/IconButton";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteTask } from "../../../utils/updateFunc";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentTask, getTasks } from "../../../store/taskSlice";

function HeaderAside() {
  const tasks = useSelector(getTasks);
  const currentTask = useSelector(getCurrentTask);
  const dispatch = useDispatch();

  return (
    <div className=" py-1 px-3 w-full flex  justify-end absolute top-0 z-[20] bg-gray-700">
      <IconButton
        icon={faTrashCan}
        htmlFor="delete-task"
        className=" text-sm text-orange-400 hover:text-orange-300 "
        title="Eliminar tarea"
        onClick={() => deleteTask(tasks, currentTask, dispatch)}
      />
    </div>
  );
}

export default HeaderAside;
