import PropTypes from "prop-types";
import ListCategorie from "./ListCategorie";

function DisplayCategories({ categories }) {
  return (
    <ul className="flex flex-col px-1 w-full overflow-y-auto max-h-[55%]">
      {categories.map((cat, i) => (
        <ListCategorie key={i} cat={cat} />
      ))}
    </ul>
  );
}

DisplayCategories.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default DisplayCategories;
