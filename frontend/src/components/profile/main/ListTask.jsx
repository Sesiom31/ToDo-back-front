import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, setCurrentTask } from "../../../store/taskSlice";
import { updateField } from "../../../utils/updateFunc";
import { faCircleCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { capitalizeCategory } from "../../../utils/configString";
import { dateFormat } from "../../../utils/configString";
import IconButton from "../../../ui/IconButton";

function ListTask({ task }) {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);


  return (
    <li
      className="bg-gray-800 border-none ring-1 ring-sky-500 rounded-md p-2 py-3 w-full  flex justify-between items-center hover:bg-gray-600 "
      onClick={() => {
        dispatch(setCurrentTask(task));
        console.log(tasks)

      }}
    >
      <div className="flex justify-between items-center gap-4 pl-2 ">
        <IconButton
          icon={faCircleCheck}
          htmlFor="complete"
          className={`${
            task.isComplete ? "text-orange-500" : "text-gray-400"
          } text-xs`}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setCurrentTask(task));

            updateField(
              task._id,
              "isComplete",
              !task.isComplete,
              dispatch,
              tasks
            );
          }}
        />

        <div>
          <h3 className="text-[1.1rem">{capitalizeCategory(task.task)}</h3>
          <p>
            Detalles: {capitalizeCategory(task.description.substring(0, 30))}
            {task.description.length > 30 && " ..."}
          </p>
          <span className="text-[0.8rem] text-gray-400">
            completar hasta el{" "}
            {dateFormat(task.dateEnd, " iiii dd 'de' MMMM 'del' yyyy")}
          </span>
        </div>
      </div>

      <IconButton
        icon={faStar}
        htmlFor="important"
        className={`${
          task.isImportant ? "text-orange-500" : "text-gray-400"
        } text-sm pr-2`}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setCurrentTask(task));
          updateField(
            task._id,
            "isImportant",
            !task.isImportant,
            dispatch,
            tasks
          );
        }}
      />
    </li>
  );
}

ListTask.propTypes = {
  task: PropTypes.object.isRequired,
};

export default ListTask;
