import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentCategory,
  setCategories,
  getCategories,
} from "../../../store/taskSlice";
import { capitalizeCategory } from "../../../utils/configString";
import IconButton from "../../../ui/IconButton";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { deleteCategorieRequest } from "../../../api/user.request";

function ListCategorie({ cat }) {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  const noDeleteCategories = ["hoy", "importantes", "completadas"];

  const onDeleteCategorie = async (categorie) => {
    const originalCategories = [...categories];
    try {
      dispatch(setCategories(categories.filter((c) => c !== categorie)));
      await deleteCategorieRequest({ categorie });
    } catch (err) {
      console.log(err);
      dispatch(setCategories(originalCategories));
    }
  };

  return (
    <li
      className="flex justify-between p-2 text-base cursor-pointer
             hover:bg-gray-600 group "
      onClick={() => {
        console.log("lista categoria");
        dispatch(setCurrentCategory(cat.name));
      }}
    >
      <p>{capitalizeCategory(cat.name)}</p>
      <div className="flex justify-between items-center gap-4">
        {!noDeleteCategories.includes(cat.name) && (
          <IconButton
            icon={faTrashCan}
            htmlFor="delete-categorie"
            className="text-[0.7rem] text-orange-600 hidden group-hover:block"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteCategorie(cat.name);
            }}
            title="eliminar"
          />
        )}
        <span>{cat.count}</span>
      </div>
    </li>
  );
}

ListCategorie.propTypes = {
  cat: PropTypes.object.isRequired,
};

export default ListCategorie;
