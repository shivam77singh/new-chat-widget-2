import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import ErrorMessage from "../error-message/ErrorMessage";

function DropDown({
  field,
  error,
  handleUserInput,
  errorStyle,
  inputType,
  options,
}) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const handleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    document.addEventListener("mouseup", function (e) {
      var container = document.querySelector(".sc-message--form-dropdown");
      if (!container.contains(e.target)) {
        setOpenDropDown(false);
      } else setOpenDropDown(true);
    });
    return () => {
      document.removeEventListener("mouseup", () => {});
      setInputValue("");
    };
  }, []);

  useEffect(() => {
    handleUserInput(inputValue, name);
  }, [inputValue]);

  const type = field.type;
  const name = field.field;
  const label = field.label;
  const myStyle = !(
    inputType != "form" ||
    (inputType == "form" && type == "phone")
  )
    ? { paddingLeft: "10px" }
    : {};
  return (
    <div className="sc-message--form-subfield">
      <p>{label}</p>
      <div className="sc-message--inputform">
        <input
          style={{
            ...myStyle,
            cursor: "context-menu",
            caretColor: "transparent",
          }}
          onClick={handleDropDown}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <MdKeyboardArrowDown
          style={{ position: "absolute", right: "5px", top: "12px" }}
          onClick={handleDropDown}
        />
        <div
          className="sc-message--form-dropdown"
          onClick={handleDropDown}
          // onMouseLeave={() => setOpenDropDown(false)}
        >
          {openDropDown &&
            options.map((option, index) => (
              <p
                onClick={() => {
                  setInputValue(option.label);
                }}
                key={index}
                style={{ paddingLeft: "10px" }}
              >
                {option.label}
              </p>
            ))}
        </div>
      </div>
      {error && <ErrorMessage error={error} errorStyle={errorStyle} />}
    </div>
  );
}

export default DropDown;
