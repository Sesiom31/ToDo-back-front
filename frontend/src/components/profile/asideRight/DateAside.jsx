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
    <div className="mb-2 h-auto min-h-[3.5rem]">
      <span className="text-xs text-gray-400">Fecha para finalizar:</span>

      <div className="flex h-[48px] w-full items-center">
        {updateIsOpen && (
          <div className="relative">
            <IconButton
              icon={faCalendarDays}
              htmlFor="calendar"
              onClick={(e) => {
                console.log("Abrir el calendario");
                setUpdateDateIsOpen(!updateDateIsOpen);
                e.stopPropagation();
              }}
              className="flex h-4 w-[24px] items-center text-gray-500 outline-none"
            />

            {updateDateIsOpen && <Calendar control={control} name="dateEnd" />}
          </div>
        )}

        <h3 className="flex h-full w-full flex-col items-start pl-2">
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
