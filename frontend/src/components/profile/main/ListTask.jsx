import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, setCurrentTask } from "../../../store/taskSlice";
import { updateField } from "../../../utils/updateFunc";
import { faCircleCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { capitalizeCategory } from "../../../utils/configString";
import { dateFormat } from "../../../utils/configString";
import IconButton from "../../../ui/IconButton";
import {
  setAsideLeftIsVisible,
  setAsideRightIsVisible,
} from "../../../store/visibleSlice";
import { useState, useEffect } from "react";

function ListTask({ task }) {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const [isMd, setIsMd] = useState(false);

  const handleTaskClick = () => {
    dispatch(setCurrentTask(task));
    dispatch(setAsideRightIsVisible(true));
    if (!isMd) {
      dispatch(setAsideLeftIsVisible(false));
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width : 768px)");

    const handleMediaQuery = (e) => {
      setIsMd(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQuery);
    setIsMd(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, []);

  return (
    <li
      className="flex w-full items-center justify-between rounded-md border-none bg-gray-800 p-2 py-3 ring-1 ring-sky-500 hover:bg-gray-600"
      onClick={handleTaskClick}
    >
      <div className="flex items-center justify-between gap-4 pl-2">
        <IconButton
          icon={faCircleCheck}
          htmlFor="complete"
          className={`${task.isComplete ? "text-orange-500" : "text-gray-400"} text-xs`}
          onClick={(e) => {
            e.stopPropagation();
            updateField("isComplete", !task.isComplete, dispatch, tasks, task);
          }}
        />

        <div>
          <h3 className="text-[1.1rem">{capitalizeCategory(task.task)}</h3>
          <p>
            Detalles: {capitalizeCategory(task.description.substring(0, 30))}
            {task.description.length > 30 && " ..."}
          </p>
          <span className="text-[0.8rem] text-gray-400">
            completar hasta el {dateFormat(task.dateEnd, " iiii dd 'de' MMMM 'del' yyyy")}
          </span>
        </div>
      </div>

      <IconButton
        icon={faStar}
        htmlFor="important"
        className={`${
          task.isImportant ? "text-orange-500" : "text-gray-400"
        } pr-2 text-sm`}
        onClick={(e) => {
          e.stopPropagation();
          updateField("isImportant", !task.isImportant, dispatch, tasks, task);
        }}
      />
    </li>
  );
}

ListTask.propTypes = {
  task: PropTypes.object.isRequired,
};

export default ListTask;
