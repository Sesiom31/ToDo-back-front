import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import IconButton from "./IconButton";

function InfoCalendar({ title, onClick, dateFormat, className }) {
  return (
    <div className={className} type="button">
      <IconButton
        icon={faCalendarDays}
        htmlFor="calendar"
        className=" text-gray-500 cursor-pointer text-[1.1rem] mr-20"
        title={title}
        onClick={onClick}
      />
      {dateFormat && (
        <span className="text-gray-400 text-sm italic ">
          La fecha límite es: {dateFormat}
        </span>
      )}
    </div>
  );
}

InfoCalendar.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  dateFormat: PropTypes.string,
  className : PropTypes.string,
};

export default InfoCalendar;
