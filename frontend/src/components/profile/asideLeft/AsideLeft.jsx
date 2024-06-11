import { useSelector, useDispatch } from "react-redux";
import { getCategories, getTasks } from "../../../store/taskSlice";
import { prepareCategories } from "../../../utils/configArrays";
import DisplayCategories from "./DisplayCategories";
import AddCategorie from "./AddCategorie";
import {
  getAsideLeftIsVisible,
  setAsideLeftIsVisible,
} from "../../../store/visibleSlice";
import IconButton from "../../../ui/IconButton";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function AsideLeft() {
  const categories = useSelector(getCategories);
  const tasks = useSelector(getTasks);
  const asideLeftIsVisible = useSelector(getAsideLeftIsVisible);
  const dispatch = useDispatch();
  const [isMd, setIsMd] = useState(false);

  const categoriesFormat = prepareCategories(categories, tasks);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width : 768px)");

    const handleMediaQuery = (e) => {
      setIsMd(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQuery);

    setIsMd(mediaQuery.matches);
    if (isMd) dispatch(setAsideLeftIsVisible(true));
    else dispatch(setAsideLeftIsVisible(false));

    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, [isMd, dispatch]);

  return (
    <aside
      className={`${
        asideLeftIsVisible ? "a-open-left" : "a-left"
      } absolute left-0 top-0 z-[200] h-full w-[48%] bg-gray-800 py-4 sm:w-[33%] sm:px-3 md:relative md:col-span-3 md:w-full md:min-w-[10rem] md:max-w-[18rem] lg:col-span-2 lg:max-w-full lg:px-2`}
    >
      <IconButton
        icon={faCircleArrowLeft}
        htmlFor="close-aside"
        className="text-xl text-gray-400"
        classNameButton={`absolute top-5 right-2 md:hidden`}
        onClick={() => dispatch(setAsideLeftIsVisible(false))}
      />

      <h2 className="mb-6 px-3 text-xl font-bold text-blue-400">Categorías</h2>

      <DisplayCategories categories={categoriesFormat} />

      <AddCategorie />
    </aside>
  );
}

export default AsideLeft;
