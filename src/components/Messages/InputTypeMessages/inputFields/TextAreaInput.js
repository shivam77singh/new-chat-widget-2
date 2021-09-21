import React from "react";
import ErrorMessage from "../error-message/ErrorMessage";

function TextAreaInput({ field, error, handleUserInput, errorStyle }) {
  const type = field.type;
  const name = field.field;
  const label = field.label;
  return (
    <div className="sc-message--form-subfield">
      <p>{label}</p>
      <div className="sc-message--inputform" style={{ height: "unset" }}>
        <textarea
          style={{
            resize: "vertical",
            border: "none",
            borderRadius: "7px",
            padding: "8px 10px",
          }}
          cols="10"
          rows="3"
          charswidth="23"
          name={name}
          type={type}
          onChange={(e) => handleUserInput(e.target.value, e.target.name)}
        ></textarea>
      </div>
      {error && <ErrorMessage error={error} errorStyle={errorStyle} />}
    </div>
  );
}

export default TextAreaInput;
