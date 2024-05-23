import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { logoutUserRequest } from "../api/user.request";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { endLoading, startLoading, endLogin } from "../store/authSlice";

const categorias = ["Hoy", "Planeado", "Importante", "Completado", "Todos"];
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

function ProfilePage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  console.log(token);

  const handleLogout = async () => {
    try {
      dispatch(startLoading())
      await logoutUserRequest();

      navigate("/login");
    } catch (err) {
      console.error("Error en el cierre de sesión", err);
    }
    finally{
      dispatch(endLogin())
    }
  };

  useEffect(() => {
    dispatch(endLoading());
  }, [dispatch]);

  return (
    <section className="w-full h-screen">
      <nav className=" w-full h-20 bg-gray-800  flex justify-between items-center p-2 px-8 gap-4">
        <h1 className=" text-white text-3xl tracking-widest font-bold">Task</h1>
        <label className=" w-[28rem] h-8 flex items-center justify-between bg-gray-700 rounded-md px-2">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-white text-xl transform scale-x-[-1] text-[1.2rem] "
          />
          <input
            type="search"
            className=" rounded-md bg-gray-700 outline-none text-white px-3 w-[95%] "
          />
        </label>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className=" text-white text-xl"
          onClick={handleLogout}
        />
      </nav>
      <main className=" grid grid-cols-12 w-full h-[calc(100%-5rem)]">
        <section className="bg-gray-700 col-span-2 px-4">
          <h2 className=" text-xl mb-6 p-1 text-orange-400 font-bold">
            Categorias
          </h2>
          <ul className="flex flex-col gap-4">
            {categorias.map((cat, i) => (
              <li key={i} className="flex justify-between p-1 text-base">
                <p>{cat}</p>
                <span>0</span>
              </li>
            ))}
          </ul>
          <button className=" bg-green-500 rounded-md p-1 w-full mt-10 text-gray-800">
            {" "}
            Agregar categoría
          </button>
        </section>

        <section className=" bg-slate-600 col-span-7 p-4 px-8 flex flex-col gap-4 items-start w-full">
          <h2 className="text-5xl">Hoy</h2>
          <button className=" bg-green-500 rounded-md p-2 w-full text-gray-800 text-lg my-4">
            Agregar una nueva tarea{" "}
          </button>
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
        </section>
        <section className=" bg-gray-700 col-span-3 p-4 flex flex-col gap-6">
          <div className="border-none ring-2 ring-sky-300 rounded-md p-2 w-full ">
            <h2>Title : Hacer el front de la app</h2>
            <p>
              description : Realizar todo el frontend de la app todolist
              utilizando tailwind{" "}
            </p>
          </div>

          <button className=" bg-green-500 rounded-md p-2 w-full text-gray-800 text-lg my-4">
            Agregar paso
          </button>
          <ul className="flex flex-col gap-6">
            {tareas[0].pasos.map((p, i) => (
              <li
                key={i}
                className="border-none ring-2 ring-sky-300 rounded-md p-2 w-full "
              >
                <h3>title: {p.title}</h3>
                <p>description: {p.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </section>
  );
}

export default ProfilePage;
