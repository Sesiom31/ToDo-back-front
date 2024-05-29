import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";

function Calendar({ control, name }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div
      className=" absolute top-[-5rem]  left-10 z-[1000]"
      onClick={(e) => e.stopPropagation()}
    >
      <Controller
        control={control}
        name={name}
        defaultValue={startDate}
        render={({ field }) => (
          <DatePicker
            selected={startDate}
            inline
            minDate={new Date()}
            onChange={(date) => {
              setStartDate(date);
              field.onChange(date);
            }}
          />
        )}
      />
    </div>
  );
}

Calendar.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
export default Calendar;
