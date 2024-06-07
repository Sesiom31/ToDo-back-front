import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import IconButton from "./IconButton";

function TaskField({ taskIsFocus, onFocus, onBlur, register, isImportant, errors }) {
  return (
    <div className="mt-6 flex w-full flex-col gap-1">
      <label htmlFor="task" className="text-sm text-gray-300">
        Tarea
      </label>
      <div
        className={` ${
          taskIsFocus && "ring-1 ring-sky-500"
        } flex h-8 w-full items-center justify-between overflow-hidden rounded-md bg-gray-700 pr-4`}
      >
        <input
          type="text"
          name="task"
          id="task"
          className="h-full w-[90%] bg-gray-700 p-2 px-4 outline-none"
          placeholder="Ingresa una tarea..."
          {...register("task")}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete="off"
        />
        <div>
          <input
            type="checkbox"
            id="important"
            className="hidden"
            {...register("isImportant")}
          />
          <IconButton
            icon={faStar}
            htmlFor="important"
            className={`${
              isImportant ? "text-orange-500" : "text-gray-400"
            } cursor-pointer text-base hover:text-orange-500`}
            title="Marcar como importante"
          />
        </div>
      </div>
      {errors.task && (
        <span className="text-xs text-pink-600">{errors.task.message}</span>
      )}
    </div>
  );
}

TaskField.propTypes = {
  taskIsFocus: PropTypes.bool.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  register: PropTypes.func.isRequired,
  isImportant: PropTypes.bool,
  errors: PropTypes.object.isRequired,
};

export default TaskField;
