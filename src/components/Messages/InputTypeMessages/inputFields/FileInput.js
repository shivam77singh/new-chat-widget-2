import React from "react";
import ErrorMessage from "../error-message/ErrorMessage";

function FileInput({ field, error, handleUserInput, errorStyle, inputType }) {
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
      <div className="sc-message--inputform" style={{ overflow: "hidden" }}>
        <input
          type={type}
          name={name}
          onChange={(e) => handleUserInput(e.target.files[0], e.target.name)}
          style={{ ...myStyle, width: "100%" }}
        />
      </div>

      {error && <ErrorMessage error={error} errorStyle={errorStyle} />}
    </div>
  );
}

export default FileInput;
