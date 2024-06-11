import { useSelector, useDispatch } from "react-redux";
import { getCurrentTask, getTasks } from "../../../store/taskSlice";
import { capitalizeCategory } from "../../../utils/configString";
import { updateTask } from "../../../utils/updateFunc";
import ButtonAdd from "../../../ui/ButtonAdd";
import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import taskSchema from "../../../schemas/task.schema";
import HeaderAside from "./HeaderAside";
import TaskAside from "./TaskAside";
import DescriptionAside from "./DescriptionAside";
import DateAside from "./DateAside";
import CategorieAside from "./CategorieAside";
import PasosUpdateAside from "./PasosUpdateAside";
import PasosAside from "./PasosAside";
import {
  getAsideRightIsVisible,
  setAsideRightIsVisible,
} from "../../../store/visibleSlice";

function AsideRight() {
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [updateDateIsOpen, setUpdateDateIsOpen] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const currentTask = useSelector(getCurrentTask);
  const tasks = useSelector(getTasks);
  const asideRightIsVisible = useSelector(getAsideRightIsVisible);
  const dispatch = useDispatch();
  const asideRef = useRef();


  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });

  const dataSet = watch("dateEnd");

  const { fields, remove, append } = useFieldArray({
    control,
    name: "pasos",
  });

  const onSubmit = async (data) => {
    updateTask(tasks, currentTask, data, dispatch);
    setUpdateIsOpen(false);
    setUpdateDateIsOpen(false);
  };

  useEffect(() => {
    reset({
      task: capitalizeCategory(currentTask.task),
      description: capitalizeCategory(currentTask.description),
      isImportant: currentTask.isImportant,
      isComplete: currentTask.isComplete,
      dateEnd: currentTask.dateEnd,
      pasos: currentTask.pasos?.length > 0 ? currentTask.pasos : [],
    });
  }, [currentTask, reset]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (asideRef.current && !asideRef.current.contains(e.target)) {
        reset();
        setUpdateIsOpen(false);
        setUpdateDateIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [reset]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width : 1024px)");

    const handleMediaQuery = (e) => {
      setIsLg(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQuery);
    setIsLg(mediaQuery.matches);

    if (isLg) dispatch(setAsideRightIsVisible(true));
    else dispatch(setAsideRightIsVisible(false));
  }, [isLg, dispatch]);

  return (
    <aside
      className={`${
        asideRightIsVisible ? "a-open-right" : "a-right"
      } absolute right-0 top-0 z-[200] flex h-full w-[55%] flex-col bg-gray-800 sm:px-4 md:w-[32%] lg:relative lg:col-span-4 lg:w-full`}
      ref={asideRef}
      onClick={() => {
        setUpdateDateIsOpen(false);
      }}
    >
      {Object.keys(currentTask).length === 0 ? (
        <h3 className="px-2 pt-8 text-gray-400">No hay una tarea seleccionada</h3>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="h-full pt-14">
          <HeaderAside />
          <div
            className={`max-h-[calc(100%-8.5rem)] w-full overflow-y-auto ${
              updateIsOpen ? "min-h-[calc(100%-8.5rem)]" : "min-h-[calc(100%-5rem)]"
            } `}
          >
            <div className="flex w-full flex-col gap-1 border-none p-2 sm:gap-6">
              <TaskAside
                updateIsOpen={updateIsOpen}
                register={register}
                errors={errors}
              />
              <DescriptionAside
                updateIsOpen={updateIsOpen}
                register={register}
                errors={errors}
                watch={watch}
              />
              <DateAside
                updateIsOpen={updateIsOpen}
                updateDateIsOpen={updateDateIsOpen}
                dataSet={dataSet}
                setUpdateDateIsOpen={setUpdateDateIsOpen}
                control={control}
              />
              <CategorieAside />
            </div>

            {currentTask.pasos.length > 0 || updateIsOpen ? (
              <>
                {updateIsOpen ? (
                  <PasosUpdateAside fields={fields} register={register} remove={remove} />
                ) : (
                  <PasosAside />
                )}
              </>
            ) : (
              <>
                {!updateIsOpen ? (
                  <h3 className="px-2 text-gray-400">No hay pasos...</h3>
                ) : (
                  <ul></ul>
                )}
              </>
            )}
          </div>

          {updateIsOpen && (
            <ButtonAdd
              name={"Agregar paso"}
              classNameButton={
                "rounded-md bg-yellow-500 text-gray-800 p-1 hover:bg-yellow-400 outline-none absolute bottom-12 right-2 left-2"
              }
              type="button"
              onClick={() => {
                append({ description: "" });
              }}
            />
          )}

          {updateIsOpen && (
            <ButtonAdd
              name={"Guardar"}
              classNameButton={
                "rounded-md bg-green-500 text-gray-800 p-1 hover:bg-green-400 outline-none absolute bottom-2 right-2 left-2"
              }
              type="submit"
            />
          )}

          {!updateIsOpen && (
            <ButtonAdd
              name={"Actualizar tarea"}
              classNameButton={
                "rounded-md bg-green-500 text-gray-800 p-1 hover:bg-green-400 outline-none absolute bottom-2 right-2 left-2"
              }
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setUpdateIsOpen(true);
              }}
            />
          )}
        </form>
      )}
    </aside>
  );
}

export default AsideRight;
