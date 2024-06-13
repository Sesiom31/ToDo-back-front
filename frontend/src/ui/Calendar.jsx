import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTask, setCurrentTask } from "../store/taskSlice";

function Calendar({ control, name, start = new Date(), isUpdate = false }) {
  const [startDate, setStartDate] = useState(start);
  const dispatch = useDispatch();
  const currentTask = useSelector(getCurrentTask);

  return (
    <div
      className="absolute left-10 top-[-5rem] z-[200]"
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
              if (isUpdate) {
                console.log("clic Calendar");
              }
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
  start: PropTypes.string,
  isUpdate: PropTypes.bool,
};
export default Calendar;
