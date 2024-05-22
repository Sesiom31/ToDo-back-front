import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InputField({
  label,
  icon,
  type = "text",
  name,
  placeholder = "",
  register,
  error = null,
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-center items-center px-2 gap-8">
        <div className=" w-[30%] flex gap-2 items-center justify-end">
          <FontAwesomeIcon icon={icon} className=" text-white" />
          <label htmlFor={name} className=" text-white">
            {label}
          </label>
        </div>

        <div className=" flex flex-col w-[50%]">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            autoComplete={"off"}
            {...register(name)}
            className={`rounded-md text-slate-800 py-[.15rem] px-2 w-full focus:outline-none focus:ring-2 ${
              error ? "focus:ring-pink-500" : "focus:ring-sky-300"
            }`}
          />
        </div>
      </div>

      <div className="w-full flex justify-center h-4 gap-8">
        <span className="w-[30%]"></span>
        <span className="text-pink-600 text-sm mt-1 px-2 w-[50%]">
          {error && error.message}
        </span>
      </div>
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default InputField;
