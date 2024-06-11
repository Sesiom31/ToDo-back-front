import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, setCategories } from "../../../store/taskSlice";
import { addCategoryRequest } from "../../../api/user.request";
import ButtonAdd from "../../../ui/ButtonAdd";

function AddCategorie() {
  const [addIsOpen, setAddIsOpen] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const categoriesOriginal = [...categories];

    try {
      setAddIsOpen(false);
      dispatch(setCategories([...categories, data.categorie]));
      await addCategoryRequest(data);
      reset();
    } catch (err) {
      console.log(err);
      dispatch(setCategories(categoriesOriginal));
    }
  };

  return (
    <div className="w-full px-2">
      {!addIsOpen ? (
        <ButtonAdd
          name={"Agregar categoria"}
          classNameButton={" bg-green-500 rounded-md p-1 w-full mt-10 text-gray-800"}
          onClick={() => setAddIsOpen(true)}
        />
      ) : (
        <div className="w-full">
          <input
            className="mt-10 w-full rounded-md bg-gray-500 p-1 px-2 text-white outline-none focus:ring-1 focus:ring-sky-500 placeholder:text-sm"
            placeholder="Nueva categoria"
            autoComplete="off"
            type="text"
            autoFocus
            {...register("categorie", {
              required: { value: true, message: "El nombre es requerido" },
              min: { value: 3, message: "Al menos 3 caracteres" },
            })}
          />
          {errors.categorie && (
            <span className="text-xs text-pink-500">{errors.categorie.message}</span>
          )}

          <div className="mt-2 flex justify-between">
            <ButtonAdd
              name={"Cancelar"}
              classNameButton={"bg-red-500 p-0.5 px-1 w-16 rounded-md text-sm"}
              onClick={() => setAddIsOpen(false)}
            />
            <ButtonAdd
              name={"Agregar"}
              classNameButton={"bg-green-600 p-0.5 px-1 w-16 rounded-md text-sm"}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCategorie;
