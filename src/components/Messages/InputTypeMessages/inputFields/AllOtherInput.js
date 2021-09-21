import React, { useEffect } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { InputTypeIcon } from "../../../icons/InputTypeIcon";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import ErrorMessage from "../error-message/ErrorMessage";

function AllOtherInput({
  field,
  error,
  handleUserInput,
  errorStyle,
  inputType,
  handleSubmit,
}) {
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
        {inputType != "form" && type != "phone" ? InputTypeIcon(type) : null}
        {type != "phone" ? (
          <input
            type={type}
            name={name}
            placeholder={inputType != "form" ? `Please enter your ${name}` : ""}
            onChange={(e) => handleUserInput(e.target.value, e.target.name)}
            style={myStyle}
          />
        ) : (
          <IntlTelInput
            onPhoneNumberChange={(...e) => {
              handleUserInput(e, name);
            }}
          />
        )}
        {inputType != "form" && (
          <RiArrowRightSLine
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="sc-message--inputbtn"
            name="submit"
          />
        )}
      </div>
      {error && <ErrorMessage error={error} errorStyle={errorStyle} />}
    </div>
  );
}

export default AllOtherInput;
