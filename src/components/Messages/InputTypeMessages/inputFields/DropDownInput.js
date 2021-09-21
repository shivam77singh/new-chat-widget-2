import React from "react";

function DropDownInput({
  field,
  error,
  handleUserInput,
  errorStyle,
  inputType,
  options,
}) {
  const type = field.type;
  const name = field.field;
  const label = field.label;
  return (
    <div className="sc-message--form-subfield">
      <p>{label}</p>
      <div className="sc-message--form-input">
        <select
          name={name}
          id={name}
          onChange={(e) => {
            handleUserInput(e.target.value, e.target.name);
          }}
          style={{ paddingLeft: "8px" }}
        >
          <option selected disabled hidden>
            Select an Option
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p style={errorStyle} className="sc-message--error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default DropDownInput;
