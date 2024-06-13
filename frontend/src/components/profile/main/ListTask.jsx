import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, setCurrentTask } from "../../../store/taskSlice";
import { updateIconsListTask } from "../../../utils/updateFunc";
import { faCircleCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { capitalizeCategory } from "../../../utils/configString";
import { dateFormat } from "../../../utils/configString";
import IconButton from "../../../ui/IconButton";
import { setClassLeft, setClassRight } from "../../../store/visibleSlice";
import { useState, useEffect } from "react";

function ListTask({ task }) {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);

  const handleTaskClick = () => {
    console.log("click");
    dispatch(setCurrentTask(task));

    if (!isMd) {
      dispatch(setClassLeft("a-left"));
    }
    if (!isLg) {
      dispatch(setClassRight("a-open-right"));
    }
  };

  useEffect(() => {
    const mediaQueryMd = window.matchMedia("(min-width: 768px)");
    const mediaQueryLg = window.matchMedia("(min-width: 1024px)");

    const handleMediaQueryMd = (e) => setIsMd(e.matches);
    const handleMediaQueryLg = (e) => setIsLg(e.matches);

    mediaQueryMd.addEventListener("change", handleMediaQueryMd);
    mediaQueryLg.addEventListener("change", handleMediaQueryLg);

    setIsMd(mediaQueryMd.matches);
    setIsLg(mediaQueryLg.matches);

    return () => {
      mediaQueryMd.removeEventListener("change", handleMediaQueryMd);
      mediaQueryLg.removeEventListener("change", handleMediaQueryLg);
    };
  }, []);

  return (
    <li
      className="flex w-full cursor-default items-center justify-between rounded-md border-none bg-gray-800 p-2 py-3 ring-1 ring-sky-500 hover:bg-gray-600"
      onClick={handleTaskClick}
    >
      <div className="flex items-center justify-between gap-4 pl-2">
        <IconButton
          icon={faCircleCheck}
          htmlFor="complete"
          className={`${task.isComplete ? "text-orange-500" : "text-gray-400"} text-xs`}
          onClick={(e) => {
            console.log(task);
            e.stopPropagation();
            updateIconsListTask(tasks, task, "isComplete", !task.isComplete, dispatch);
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
          updateIconsListTask(tasks, task, "isImportant", !task.isImportant, dispatch);
        }}
      />
    </li>
  );
}

ListTask.propTypes = {
  task: PropTypes.object.isRequired,
};

export default ListTask;
