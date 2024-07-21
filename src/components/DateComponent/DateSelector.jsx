import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// interface DateSelectorProps {
//   minDate: Date | null;
//   maxDate: Date | null;
//   selectedDate: Date | null;
//   onDateChange: (date: Date | null) => void;
// }

const DateSelector = ({
  minDate,
  maxDate,
  selectedDate,
  onDateChange,
  placeholderText
}) => {
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat="dd-MMMM-yyyy"
        className="form-control"
        placeholderText={placeholderText}
      />
    </div>
  );
};

export default DateSelector;
