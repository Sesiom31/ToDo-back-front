import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import IconButton from "./IconButton";

function TaskField({
  taskIsFocus,
  onFocus,
  onBlur,
  register,
  isImportant,
  errors,
}) {
  return (
    <div className=" flex flex-col gap-1 w-full mt-6">
      <label htmlFor="task" className=" text-sm">
        Tarea
      </label>
      <div
        className={` ${
          taskIsFocus && "ring-1 ring-sky-500"
        } w-full bg-gray-700 rounded-md h-8 flex items-center justify-between pr-4 overflow-hidden`}
      >
        <input
          type="text"
          name="task"
          id="task"
          className=" h-full bg-gray-700 w-[90%] outline-none p-2 px-4"
          placeholder="Ingresa una tarea..."
          {...register("task")}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <div>
          <input
            type="checkbox"
            id="important"
            className=" hidden"
            {...register("isImportant")}
          />
          <IconButton
            icon={faStar}
            htmlFor="important"
            className={`${
              isImportant ? "text-orange-500" : "text-gray-400"
            } text-base hover:text-orange-500 cursor-pointer `}
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
