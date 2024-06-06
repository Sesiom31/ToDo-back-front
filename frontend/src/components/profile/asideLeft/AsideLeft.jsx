import { useSelector } from "react-redux";
import { getCategories, getTasks } from "../../../store/taskSlice";
import { prepareCategories } from "../../../utils/configArrays";
import DisplayCategories from "./DisplayCategories";
import AddCategorie from "./AddCategorie";

function AsideLeft() {
  const categories = useSelector(getCategories);
  const tasks = useSelector(getTasks);

  const categoriesFormat = prepareCategories(categories, tasks);

  return (
    <aside className="bg-gray-700 col-span-2 py-4 h-full">
      <h2 className=" text-xl mb-6 px-3 text-blue-400 font-bold">Categorias</h2>

      <DisplayCategories categories={categoriesFormat} />

      <AddCategorie />
    </aside>
  );
}

export default AsideLeft;
