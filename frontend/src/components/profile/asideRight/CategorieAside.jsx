import PropTypes from "prop-types";
import IconButton from "../../../ui/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../../store/taskSlice";
import { faCircleCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { updateIconsListTask } from "../../../utils/updateFunc";

function CategorieAside({ taskId }) {
  const tasks = useSelector(getTasks);
  const dispatch = useDispatch();

  const currentTask = tasks.find((t) => t._id === taskId);

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
            updateIconsListTask(
              tasks,
              currentTask,
              "isComplete",
              !currentTask.isComplete,
              dispatch,
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
            updateIconsListTask(
              tasks,
              currentTask,
              "isImportant",
              !currentTask.isImportant,
              dispatch,
            );
          }}
        />
      </div>
    </div>
  );
}

CategorieAside.propTypes = {
  taskId: PropTypes.string.isRequired,
};

export default CategorieAside;
