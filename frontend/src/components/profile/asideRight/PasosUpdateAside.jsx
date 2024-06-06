import PropTypes from "prop-types";
import IconButton from "../../../ui/IconButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function PasosUpdateAside({ fields, register, remove }) {
  return (
    <ul className=" w-full h-auto">
      {fields.map((field, index) => (
        <div className="w-full p-2 flex flex-col" key={field.id}>
          <label className="text-xs text-gray-400  w-full">
            Paso {index + 1}
          </label>
          <div className="w-full rounded-md flex justify-between items-center pr-2 overflow-hidden bg-gray-800 border-none ring-1 ring-sky-400">
            <input
              type="text"
              defaultValue={field.description}
              {...register(`pasos.${index}.description`)}
              className="w-[90%] outline-none bg-gray-800 text-white px-2 "
            />
            <IconButton
              icon={faTrash}
              htmlFor="delete"
              className="text-orange-500 text-xs  "
              onClick={(e) => {
                e.stopPropagation();
                console.log("eliminar paso");
                remove(index);
              }}
            />
          </div>
        </div>
      ))}
    </ul>
  );
}

PasosUpdateAside.propTypes = {
  fields: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default PasosUpdateAside;
