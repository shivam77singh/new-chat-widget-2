import React, { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Calendar from "react-calendar";
import { InputTypeIcon } from "../../../icons/InputTypeIcon";
import "react-calendar/dist/Calendar.css";

function DateInput({
  field,
  error,
  handleUserInput,
  errorStyle,
  inputType,
  handleSubmit,
}) {
  const [showInput, setShowInput] = useState(true);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const type = field.type;
  const name = field.field;
  const label = field.label;
  const myStyle = !(
    inputType != "form" ||
    (inputType == "form" && type == "phone")
  )
    ? { paddingLeft: "10px" }
    : {};
  useEffect(() => {
    document.addEventListener("mouseup", function (e) {
      var container = document.querySelector(".sc-message--calendar");
      if (container != null && !container.contains(e.target)) {
        setOpen(false);
      }
    });
    return () => {
      document.removeEventListener("mouseup", () => {});
    };
  }, []);

  const handleCalendar = (e) => {
    setOpen(!open);
  };
  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const value = `${day < 10 ? `0${day}` : day}-${
      month < 10 ? `0${month}` : month
    }-${year}`;
    handleUserInput(value, name);
    setInput(value);
    setOpen(false);
  };

  return (
    <div className="sc-message--form-subfield">
      <p>{label}</p>
      <div className="sc-message--inputform">
        {inputType != "form" && type != "phone" ? InputTypeIcon(type) : null}
        <BiCalendar
          style={{ width: "21px" }}
          className="sc-message--inputavatar"
          onClick={handleCalendar}
        />
        <input
          type={type}
          name={name}
          value={input}
          style={{ paddingLeft: "35px" }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          // placeholder="dd-mm-yyyy"
        />
        <RiArrowRightSLine
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className="sc-message--inputbtn"
        />
        {open && (
          <div className="sc-message--calendar">
            <div className="sc-message--calendar-date">Pick a Date</div>
            <Calendar
              onChange={formatDate}
              minDate={new Date()}
              next2Label=""
              prev2Label=""
              nextLabel={
                <IoIosArrowForward
                  style={{ fontSize: "20px", color: "#150e5b" }}
                />
              }
              prevLabel={
                <IoIosArrowBack
                  style={{ fontSize: "20px", color: "#150e5b" }}
                />
              }
            />
          </div>
        )}
        {error && <ErrorMessage error={error} errorStyle={errorStyle} />}
      </div>
    </div>
  );
}

export default DateInput;
