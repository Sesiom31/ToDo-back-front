import PropTypes from "prop-types";

function DescriptionField({ register, errors }) {
  return (
    <div className="mt-6 flex w-full flex-col gap-1">
      <label htmlFor="description" className="text-sm text-gray-300">
        Descripción
      </label>
      <textarea
        name="description"
        id="description"
        className="min-h-16 w-full rounded-md bg-gray-700 p-2 px-4 outline-none focus:ring-1 focus:ring-sky-500"
        placeholder="Ingresa una descripción"
        {...register("description")}
      />
      {errors.description && (
        <span className="text-xs text-pink-600">{errors.description.message}</span>
      )}
    </div>
  );
}

DescriptionField.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default DescriptionField;
