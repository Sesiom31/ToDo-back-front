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

function AsideRight() {
  return (
    <aside className=" bg-gray-700 col-span-3 p-4 flex flex-col gap-6">
      <div className="border-none ring-2 ring-sky-300 rounded-md p-2 w-full ">
        <h2>Title : Hacer el front de la app</h2>
        <p>
          description : Realizar todo el frontend de la app todolist utilizando
          tailwind{" "}
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
    </aside>
  );
}

export default AsideRight;
