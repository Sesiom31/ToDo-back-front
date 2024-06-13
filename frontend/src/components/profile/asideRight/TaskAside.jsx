import PropTypes from "prop-types";
import { capitalizeCategory } from "../../../utils/configString";
import { useSelector } from "react-redux";
import { getCurrentTask } from "../../../store/taskSlice";

function TaskAside({ updateIsOpen, register, errors }) {
  const currentTask = useSelector(getCurrentTask);
  
  return (
    <div className="h-auto min-h-[3.5rem]">
      <span className="text-xs text-gray-400">Tarea:</span>
      {updateIsOpen ? (
        <>
          <input
            type="text"
            className="h-[1.6rem] w-full rounded-md border-none bg-gray-800 px-2 text-white outline-none ring-1 ring-sky-400"
            name="task"
            autoFocus
            {...register("task")}
          />
          {errors.task && (
            <span className="text-xs text-pink-500">{errors.task.message}</span>
          )}
        </>
      ) : (
        <h3 className="h-[1.6rem] pl-2">{capitalizeCategory(currentTask.task)}</h3>
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
