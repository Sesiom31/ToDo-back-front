import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../../DateInput.css";
import { yupResolver } from "@hookform/resolvers/yup";
import taskSchema from "../../../schemas/task.schema";
import PropTypes from "prop-types";
import ButtonClose from "../../../ui/ButtonClose";
import Calendar from "../../../ui/Calendar";
import InfoCalendar from "../../../ui/InfoCalendar";
import PasosField from "./PasosField";
import TaskField from "../../../ui/TaskField";
import DescriptionField from "../../../ui/DescriptionField";
import { createTaskRequest } from "../../../api/task.request";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../store/authSlice";
import { getCurrentCategory, getTasks, setTasks } from "../../../store/taskSlice";
import { dateFormat } from "../../../utils/configString";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ButtonAdd from "../../../ui/ButtonAdd";

function AddTask({ onAddTask, setIsLoad }) {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [taskIsFocus, setTaskIsFocus] = useState(false);

  const userId = useSelector(getUser); /* userId */
  const currentCategorie = useSelector(getCurrentCategory);
  const tasks = useSelector(getTasks);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      task: "",
      description: "",
      isImportant: false,
      dateEnd: new Date(),
      pasos: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pasos",
  });

  const isImportant = watch("isImportant");
  const dateSet = watch("dateEnd");

  const onSubmit = async (data) => {
    const belongsCategories = [
      currentCategorie,
      isImportant ? "importantes" : null,
    ].filter(Boolean);

    const originalTasks = [...tasks];

    const newTask = {
      ...data,
      belongsCategories,
      isComplete: false,
      user: userId,
      dateEnd: data.dateEnd.toISOString(),
    };

    try {
      onAddTask(false);
      dispatch(setTasks([...tasks, newTask]));
      await createTaskRequest(newTask);
    } catch (err) {
      console.log(err);
      dispatch(setTasks(originalTasks));
    } finally {
      setIsLoad(true);
    }
  };

  return (
    <div
      className="absolute inset-0 z-[300] flex h-screen w-full -translate-y-24 items-center justify-center bg-[#464545] bg-opacity-70 py-10 "
      onClick={() => setIsOpenCalendar(false)}
    >
      <form
        className="relative z-[60] flex h-[65%] w-[90%] flex-col items-start justify-between rounded-lg bg-gray-800 pb-4 pt-10 md:w-[60%] md:h-[80%] lg:w-[45%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ButtonClose
          onClick={() => onAddTask(false)}
          icon={faXmark}
          classNameButton={"absolute z-[90] top-4 right-4 text-[1.5rem]"}
          classNameIcon={
            "cursor-pointer rounded-full bg-white text-gray-600 aspect-square p-0.5 hover:scale-110"
          }
        />

        <div className="relative h-[85%] w-full">
          <h2 className="w-full text-center text-2xl">Nueva tarea</h2>

          <div className="h-full max-h-[92%] w-full overflow-y-auto px-6">
            <TaskField
              taskIsFocus={taskIsFocus}
              isImportant={isImportant}
              register={register}
              errors={errors}
              onFocus={() => setTaskIsFocus(true)}
              onBlur={() => setTaskIsFocus(false)}
            />

            <DescriptionField register={register} errors={errors} />

            <div className="relative mt-1 w-full">
              <InfoCalendar
                dateFormat={dateFormat(dateSet, "iiii d 'de' MMMM 'del' yyyy")}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenCalendar(!isOpenCalendar);
                }}
                title={"Agregar fecha de finalizacion"}
                className="flex h-8 w-full items-center justify-start gap-1 px-4"
              />

              {isOpenCalendar && <Calendar control={control} name="dateEnd" />}
            </div>

            <ul className="mb-20 mt-10 flex max-h-[50%] w-full flex-col items-center gap-6">
              {fields.map((field, index) => (
                <PasosField
                  key={field.id}
                  field={field}
                  index={index}
                  register={register}
                  onClick={() => {
                    remove(index);
                  }}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="flex h-12 w-full items-center justify-between px-4 py-0.5">
          <ButtonAdd
            name="Agregar paso"
            classNameButton="bg-gray-700 p-2 rounded-md w-40 h-full hover:bg-gray-600"
            onClick={() => {
              append({ description: "" });
            }}
          />

          <ButtonAdd
            name="Crear tarea"
            type="submit"
            classNameButton={
              "bg-green-700 p-2 rounded-md w-40 self-end h-full hover:bg-green-600"
            }
          />
        </div>
      </form>
    </div>
  );
}

AddTask.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  setIsLoad: PropTypes.func,
};

export default AddTask;
