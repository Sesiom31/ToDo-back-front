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
    /* modificar h */
    <div className="relative flex h-8 w-full items-center gap-8">
      <div className="border-4text-end flex w-[35%] items-center justify-end gap-2">
        <FontAwesomeIcon icon={icon} className="text-white" />
        <label htmlFor={name} className="w-auto text-[1rem] text-white sm:text-[1rem]">
          {label}
        </label>
      </div>

      <div className="relative flex w-[65%] flex-col">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          {...register(name)}
          autoComplete="off"
          className={`w-full rounded-md bg-gray-700 px-2 py-[.15rem] text-[0.9rem] text-[#fff] ring-1 focus:outline-none focus:ring-1 sm:text-base ${
            error && "ring-pink-500"
          } ${error ? "focus:ring-pink-500" : "focus:ring-[#0ea5e9]"} `}
        />
        <span className="absolute left-0 top-[1.7rem] mt-1 w-full px-1 text-[0.8rem] text-pink-500">
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
