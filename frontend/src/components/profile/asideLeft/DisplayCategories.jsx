import PropTypes from "prop-types";
import ListCategorie from "./ListCategorie";

function DisplayCategories({ categories }) {
  return (
    <ul className="flex max-h-[55%] w-full flex-col overflow-y-auto px-1 md:max-h-[75%]">
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

/* flex flex-col px-1 w-full overflow-y-auto max-h-[55%] md:max-h-[75%] */
