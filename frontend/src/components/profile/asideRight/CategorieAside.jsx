import IconButton from "../../../ui/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentTask, getTasks } from "../../../store/taskSlice";
import { faCircleCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { updateField } from "../../../utils/updateFunc";

function CategorieAside() {
  const currentTask = useSelector(getCurrentTask);
  const tasks = useSelector(getTasks);
  const dispatch = useDispatch();

  return (
    <div className="flex h-16 items-center justify-around">
      <div className="flex h-full flex-col items-center gap-1">
        <span className="flex h-6 items-center text-xs text-gray-400">completo</span>
        <IconButton
          icon={faCircleCheck}
          htmlFor="complete"
          className={`${
            currentTask.isComplete ? "text-orange-500" : "text-gray-400"
          } text-xs`}
          onClick={(e) => {
            e.stopPropagation();
            updateField(
              currentTask._id,
              "isComplete",
              !currentTask.isComplete,
              dispatch,
              tasks,
            );
          }}
        />
      </div>
      <div className="flex h-full flex-col items-center gap-1">
        <span className="flex h-6 items-center text-xs text-gray-400">importante</span>

        <IconButton
          icon={faStar}
          htmlFor="importante"
          className={`${
            currentTask.isImportant ? "text-orange-500" : "text-gray-400"
          } text-sm`}
          onClick={(e) => {
            e.stopPropagation();

            updateField(
              currentTask._id,
              "isImportant",
              !currentTask.isImportant,
              dispatch,
              tasks,
            );
          }}
        />
      </div>
    </div>
  );
}

export default CategorieAside;
