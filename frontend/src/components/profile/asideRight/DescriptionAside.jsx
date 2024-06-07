import PropTypes from "prop-types";
import { capitalizeCategory } from "../../../utils/configString";
import { useSelector } from "react-redux";
import { getCurrentTask } from "../../../store/taskSlice";
import { useEffect } from "react";

function DescriptionAside({ updateIsOpen, register, errors, watch }) {
  const currentTask = useSelector(getCurrentTask);
  const description = watch("description");

  useEffect(() => {
    const textarea = document.getElementById("descriptionTextarea");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [description, updateIsOpen]);

  return (
    <div className="h-auto min-h-[3.5rem]">
      <span className="text-xs text-gray-400">Descripción:</span>
      {updateIsOpen ? (
        <>
          <textarea
            id="descriptionTextarea"
            className="h-auto min-h-[1.6rem] w-full resize-none rounded-md bg-gray-800 px-2 text-white outline-none ring-1 ring-sky-400"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-xs text-pink-500">{errors.description.message}</span>
          )}
        </>
      ) : (
        <p className="h-auto min-h-[1.6rem] pl-2">
          {capitalizeCategory(currentTask.description)}
        </p>
      )}
    </div>
  );
}

DescriptionAside.propTypes = {
  updateIsOpen: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
};

export default DescriptionAside;
