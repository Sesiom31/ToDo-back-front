import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCurrentCategory } from "../../../store/taskSlice";
import { capitalizeCategory, dateFormat } from "../../../utils/configString";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonAdd from "../../../ui/ButtonAdd";

function HeaderMain({ setIsOpenAddTask }) {
  const currentCategory = useSelector(getCurrentCategory);

  const categorieNoCreate = ["importantes", "completadas"];
  return (
    <section
      className={` ${
        categorieNoCreate.includes(currentCategory) && "sm:h-20 md:h-24"
      } h-40 w-full py-3`}
    >
      <div className={`ml-8 md:ml-0 flex flex-col gap-2`}>
        <h2 className="px-4 text-5xl">{capitalizeCategory(currentCategory)}</h2>
        <span className="px-4">{dateFormat(new Date(), " iiii',' d 'de' MMMM")}</span>
      </div>

      <div className="h-full w-full px-4">
        {!categorieNoCreate.includes(currentCategory) && (
          <ButtonAdd
            name="Agregar una nueva tarea"
            icon={faPlus}
            classNameButton="bg-[#FF7F50] border border-[#FF7F50] rounded-md p-2 px-4 w-full h-11 text-[#00003d] text-base my-4 flex justify-between items-center"
            classNameIcon=" text-base w-[18px]"
            onClick={() => setIsOpenAddTask(true)}
          />
        )}
      </div>
    </section>
  );
}

HeaderMain.propTypes = {
  setIsOpenAddTask: PropTypes.func.isRequired,
};

export default HeaderMain;
