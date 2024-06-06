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
import {
  getCurrentCategory,
  getTasks,
  setTasks,
} from "../../../store/taskSlice";
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
      className=" absolute inset-0 w-full h-full z-50 bg-[#464545] bg-opacity-70 flex justify-center py-10"
      onClick={() => setIsOpenCalendar(false)}
    >
      <form
        className=" w-[60%] h-full bg-gray-800 flex flex-col   pt-10 pb-4 items-start justify-between rounded-lg 
        relative z-[60]  "
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

        <div className="w-full h-[85%]  relative ">
          <h2 className=" text-2xl w-full text-center">Nueva tarea</h2>

          <div className="w-full overflow-y-auto max-h-[92%] h-full px-6 ">
            <TaskField
              taskIsFocus={taskIsFocus}
              isImportant={isImportant}
              register={register}
              errors={errors}
              onFocus={() => setTaskIsFocus(true)}
              onBlur={() => setTaskIsFocus(false)}
            />

            <DescriptionField register={register} errors={errors} />

            <div className=" w-full mt-1 relative ">
              <InfoCalendar
                dateFormat={dateFormat(dateSet, "iiii d 'de' MMMM 'del' yyyy")}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenCalendar(!isOpenCalendar);
                }}
                title={"Agregar fecha de finalizacion"}
                className=" w-full h-8 px-4 flex justify-start items-center gap-1 "
              />

              {isOpenCalendar && <Calendar control={control} name="dateEnd" />}
            </div>

            <ul className="w-full flex flex-col items-center gap-6 mt-10 max-h-[50%] ">
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

        <div className="w-full h-12 flex items-center justify-between px-4 py-0.5">
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
