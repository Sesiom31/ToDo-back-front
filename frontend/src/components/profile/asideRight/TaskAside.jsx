import PropTypes from "prop-types";
import { capitalizeCategory } from "../../../utils/configString";
import { useSelector } from "react-redux";
import { getCurrentTask } from "../../../store/taskSlice";

function TaskAside({updateIsOpen, register, errors}) {
  const currentTask = useSelector(getCurrentTask);
  return (
    <div className=" min-h-[3.5rem] h-auto">
      <span className="text-xs text-gray-400">Tarea:</span>
      {updateIsOpen ? (
        <>
          <input
            type="text"
            className="w-full h-[1.6rem] border-none ring-1 ring-sky-400 outline-none rounded-md px-2
                  bg-gray-800 text-white"
            name="task"
            autoFocus
            {...register("task")}
          />
          {errors.task && (
            <span className="text-xs text-pink-500">{errors.task.message}</span>
          )}
        </>
      ) : (
        <h3 className="pl-2 h-[1.6rem] ">
          {capitalizeCategory(currentTask.task)}
        </h3>
      )}
    </div>
  );
}

TaskAside.propTypes = {
  updateIsOpen: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default TaskAside;
