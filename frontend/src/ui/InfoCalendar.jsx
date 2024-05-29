import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function InfoCalendar({ title, onClick, dateFormat }) {
  return (
    <div className=" w-full h-8 px-4 flex justify-start items-center gap-1 ">
      <FontAwesomeIcon
        icon={faCalendarDays}
        className=" text-gray-500 cursor-pointer text-[1.1rem] mr-20"
        title={title}
        onClick={onClick}
      />
      <span className="text-gray-400 text-sm italic ">
        La fecha límite es: {dateFormat}
      </span>
    </div>
  );
}

InfoCalendar.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  dateFormat: PropTypes.string,
};

export default InfoCalendar;
