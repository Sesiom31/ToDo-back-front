import PropTypes from "prop-types";
import IconButton from "../../../ui/IconButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function PasosUpdateAside({ fields, register, remove }) {
  return (
    <ul className="h-auto w-full">
      {fields.map((field, index) => (
        <div className="flex w-full flex-col p-2" key={field.id}>
          <label className="w-full text-xs text-gray-400">Paso {index + 1}</label>
          <div className="flex w-full items-center justify-between overflow-hidden rounded-md border-none bg-gray-800 pr-2 ring-1 ring-sky-400">
            <input
              type="text"
              defaultValue={field.description}
              {...register(`pasos.${index}.description`)}
              className="w-[90%] bg-gray-800 px-2 text-white outline-none"
            />
            <IconButton
              icon={faTrash}
              htmlFor="delete"
              className="text-xs text-orange-500"
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
