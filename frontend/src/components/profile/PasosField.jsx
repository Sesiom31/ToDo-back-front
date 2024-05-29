import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function PasosField({ field, index, register, onClick }) {
  return (
    <div className="w-full  ">
      <label className="text-sm">Paso {index + 1}</label>
      <div className="w-full bg-gray-700 rounded-md h-8 flex items-center justify-between pr-4 overflow-hidden">
        <input
          type="text"
          className=" h-full bg-gray-700 w-[90%] outline-none p-2 px-4"
          placeholder="Ingresa la descripción del paso"
          defaultValue={field.description}
          {...register(`pasos.${index}.description`)}
        />
        <div>
          <label htmlFor="trash">
            <FontAwesomeIcon
              icon={faTrash}
              className={`
                      text-gray-400
                     text-base hover:text-red-700 cursor-pointer  `}
              title="Eliminar paso"
              onClick={onClick}
            />
          </label>
        </div>
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
