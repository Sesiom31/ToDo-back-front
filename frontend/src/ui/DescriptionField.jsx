import PropTypes from "prop-types";

function DescriptionField({ register, errors }) {
  return (
    <div className="flex flex-col gap-1 w-full mt-6">
      <label htmlFor="description" className="text-sm">
        Descripción
      </label>
      <textarea
        name="description"
        id="description"
        className=" min-h-16 bg-gray-700 w-full outline-none p-2 px-4 rounded-md focus:ring-1 focus:ring-sky-500"
        placeholder="Ingresa una descripción"
        {...register("description")}
      />
      {errors.description && (
        <span className="text-xs text-pink-600">
          {errors.description.message}
        </span>
      )}
    </div>
  );
}

DescriptionField.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default DescriptionField;
