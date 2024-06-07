import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import IconButton from "./IconButton";

function InfoCalendar({ title, onClick, dateFormat, className }) {
  return (
    <div className={className} type="button">
      <IconButton
        icon={faCalendarDays}
        htmlFor="calendar"
        className="mr-5 cursor-pointer text-[1.1rem] text-gray-500"
        title={title}
        onClick={onClick}
      />
      {dateFormat && (
        <span className="text-sm italic text-gray-400">
          Completar hasta: {dateFormat}
        </span>
      )}
    </div>
  );
}

InfoCalendar.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  dateFormat: PropTypes.string,
  className: PropTypes.string,
};

export default InfoCalendar;
