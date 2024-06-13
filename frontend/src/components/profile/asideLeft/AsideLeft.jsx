import { useSelector, useDispatch } from "react-redux";
import { getCategories, getTasks } from "../../../store/taskSlice";
import { prepareCategories } from "../../../utils/configArrays";
import DisplayCategories from "./DisplayCategories";
import AddCategorie from "./AddCategorie";
import { getClassLeft, setClassLeft } from "../../../store/visibleSlice";
import IconButton from "../../../ui/IconButton";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

function AsideLeft() {
  console.log("ASIDE LEFT");
  const categories = useSelector(getCategories);
  const tasks = useSelector(getTasks);
  const classLeft = useSelector(getClassLeft);
  const dispatch = useDispatch();

  const categoriesFormat = prepareCategories(categories, tasks);

  return (
    <aside
      className={` md:a-open-left ${
        classLeft
      } absolute left-0 top-0 z-[200] h-full w-[48%] bg-gray-800 py-4 sm:w-[33%]  md:relative md:col-span-3 md:w-full md:min-w-[10rem] md:max-w-[18rem] lg:col-span-2 lg:max-w-full `}
    >
      <IconButton
        icon={faCircleArrowLeft}
        htmlFor="close-aside"
        className="text-xl text-gray-400"
        classNameButton={`absolute top-5 right-2 md:hidden`}
        onClick={() => dispatch(setClassLeft("a-left"))}
      />

      <h2 className="mb-6 px-4 text-xl font-bold text-blue-400">Categorías</h2>

      <DisplayCategories categories={categoriesFormat} />

      <AddCategorie />
    </aside>
  );
}

export default AsideLeft;
