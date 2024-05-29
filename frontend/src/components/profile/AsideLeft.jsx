const categorias = ["Hoy", "Planeado", "Importante", "Completado", "Todos"];



function AsideLeft() {
  return (
    <aside className="bg-gray-700 col-span-2 p-4">
      <h2 className=" text-xl mb-6 p-1 text-blue-400 font-bold">
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
    </aside>
  );
}

export default AsideLeft;
