import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import IconButton from "../../../ui/IconButton";
import { useState } from "react";

function PasosField({ field, index, register, onClick }) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className="w-full">
      <label className="text-sm text-gray-300">Paso {index + 1}</label>
      <div
        className={`flex h-8 w-full items-center justify-between overflow-hidden rounded-md border-none bg-gray-700 pr-4 outline-none ${isFocus && "ring-1 ring-sky-500"}`}
      >
        <input
          type="text"
          className="h-full w-[90%] bg-gray-700 p-2 px-4 outline-none"
          placeholder="Ingresa la descripción del paso"
          defaultValue={field.description}
          {...register(`pasos.${index}.description`)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoComplete="off"
        />

        <IconButton
          icon={faTrash}
          htmlFor="delete"
          className="text-sm text-gray-400 hover:text-orange-600"
          title="Eliminar paso"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
PasosField.propTypes = {
  field: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default PasosField;
