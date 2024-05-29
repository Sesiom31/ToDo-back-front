import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTask from "./AddTask";
import { useState } from "react";

const tareas = [
  {
    title: "Hacer el front de la app",
    description:
      " Realizar todo el frontend de la app todolist utilizando tailwind ",
    Date: Date.now(),
    categorie: ["Hoy", "Todos"],
    pasos: [
      {
        title: "Instalar las bibliotecas",
        description: "bibliotecas para animacion, formularios, etc",
        completed: false,
      },
      {
        title: "Instalar las bibliotecas",
        description: "bibliotecas para animacion, formularios, etc",
        completed: false,
      },
    ],
  },
  {
    title: "Hacer el front de la app",
    description:
      " Realizar todo el frontend de la app todolist utilizando tailwind ",
    Date: Date.now(),
    categorie: ["Hoy", "Todos"],
    pasos: [],
  },
];

function Main() {
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);
  return (
    <main className=" bg-slate-600 col-span-7 p-4 px-8 flex flex-col gap-4 items-start w-full">
      <h2 className="text-5xl">Hoy</h2>
      <button
        className=" bg-[#FF7F50] border border-[#FF7F50] rounded-md p-2 w-full h-12 text-[#00003d] text-base my-4 flex justify-between items-center px-4"
        onClick={() => setIsOpenAddTask(true)}
      >
        <h3>Agregar una nueva tarea </h3>
        <FontAwesomeIcon icon={faPlus} className=" text-base w-[18px]" />
      </button>

      {isOpenAddTask && <AddTask onAddTask={setIsOpenAddTask} />}

      <section className="w-full">
        <ul className="flex flex-col gap-6 w-full">
          {tareas.map((t, i) => (
            <li
              className=" border-none ring-2 ring-sky-300 rounded-md p-2 w-full "
              key={i}
            >
              <p>tarea: {t.title}</p>
              <p>description:{t.description.substring(0, 30)}...</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
