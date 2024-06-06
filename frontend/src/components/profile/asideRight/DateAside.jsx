import PropTypes from "prop-types";
import IconButton from "../../../ui/IconButton";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { capitalizeCategory, dateFormat } from "../../../utils/configString";
import Calendar from "../../../ui/Calendar";

function DateAside({
  updateIsOpen,
  updateDateIsOpen,
  dataSet,
  setUpdateDateIsOpen,
  control,
}) {
  return (
    <div className=" min-h-[3.5rem] h-auto mb-2 ">
      <span className="text-xs text-gray-400">Fecha para finalizar:</span>

      <div className="flex items-center  w-full h-[48px] ">
        {updateIsOpen && (
          <div className="relative ">
            <IconButton
              icon={faCalendarDays}
              htmlFor="calendar"
              onClick={(e) => {
                console.log("Abrir el calendario");
                setUpdateDateIsOpen(!updateDateIsOpen);
                e.stopPropagation();
              }}
              className="text-gray-500 w-[24px] h-4 flex items-center outline-none "
            />

            {updateDateIsOpen && <Calendar control={control} name="dateEnd" />}
          </div>
        )}

        <h3 className="pl-2  w-full h-full flex flex-col items-start">
          <span>{capitalizeCategory(dateFormat(dataSet, "iiii"))}</span>
          <span>{dateFormat(dataSet, "dd 'de' MMMM 'del' yyyy")}</span>
        </h3>
      </div>
    </div>
  );
}

DateAside.propTypes = {
  updateIsOpen: PropTypes.bool.isRequired,
  updateDateIsOpen: PropTypes.bool.isRequired,
  dataSet: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  setUpdateDateIsOpen: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
};

export default DateAside;
