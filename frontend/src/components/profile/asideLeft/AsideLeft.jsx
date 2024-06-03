import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getTasks,
  setCategories,
  setCurrentCategory,
} from "../../../store/taskSlice";
import { capitalizeCategory } from "../../../utils/configString";
import { prepareCategories } from "../../../utils/configArrays";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  addCategoryRequest,
  deleteCategorieRequest,
} from "../../../api/user.request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function AsideLeft() {
  const [addCategory, setAddCategory] = useState(false);
  const categories = useSelector(getCategories);
  const tasks = useSelector(getTasks);
  const dispatch = useDispatch();

  const objCategories = prepareCategories(categories, tasks);
  const noDeleteCategories = ["hoy", "importantes", "completadas"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onDeleteCategorie = async (categorie) => {
    const originalCategories = [...categories]
    try {
      dispatch(setCategories(categories.filter(c=> c !== categorie)));
      await deleteCategorieRequest({categorie});
    } catch (err) {
      console.log(err);
      dispatch(setCategories(originalCategories))
    }
  };

  const onSubmit = async (data) => {
    const categoriesOriginal = [...categories];
    console.log(data);
    try {
      dispatch(setCategories([...categories, data.categorie]));
      await addCategoryRequest(data);
      setAddCategory(false);
      console.log(data);
      reset();
    } catch (err) {
      console.log(err);
      dispatch(setCategories(categoriesOriginal));
    }
  };

  return (
    <aside className="bg-gray-700 col-span-2 py-4 h-full">
      <h2 className=" text-xl mb-6 p-1 text-blue-400 font-bold">Categorias</h2>
      <ul className="flex flex-col px-1 w-full overflow-y-auto max-h-[55%]">
        {objCategories.map((cat, i) => (
          <li
            key={i}
            className="flex justify-between p-2 text-base cursor-pointer
             hover:bg-gray-600 group "
            onClick={() => {
              console.log("lista categoria");
              dispatch(setCurrentCategory(cat.name));
            }}
          >
            <p>{capitalizeCategory(cat.name)}</p>
            <div className="flex justify-between items-center gap-4">
              {!noDeleteCategories.includes(cat.name) && (
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="text-[0.7rem] text-orange-600 hidden group-hover:block "
                  title="Eliminar"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCategorie(cat.name)
                  }}
                />
              )}
              <span>{cat.count}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="w-full px-2">
        {!addCategory ? (
          <button
            className=" bg-green-500 rounded-md p-1 w-full mt-10 text-gray-800"
            onClick={() => setAddCategory(true)}
          >
            {" "}
            Agregar categoría
          </button>
        ) : (
          <div className="w-full ">
            <input
              className=" bg-gray-500 rounded-md p-1 w-full mt-10 text-white outline-none 
              focus:ring-1 focus:ring-sky-500"
              type="text"
              {...register("categorie", {
                required: { value: true, message: "El nombre es requerido" },
                min: { value: 3, message: "Al menos 3 caracteres" },
              })}
            />
            {errors.categorie && (
              <span className="text-xs text-pink-500">
                {errors.categorie.message}
              </span>
            )}

            <div className="mt-2 flex justify-between">
              <button
                className="bg-red-500 p-0.5 px-1 w-16 rounded-md text-sm"
                onClick={() => setAddCategory(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-green-600 p-0.5 px-1 w-16 rounded-md text-sm"
                onClick={handleSubmit(onSubmit)}
              >
                Agregar
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default AsideLeft;
