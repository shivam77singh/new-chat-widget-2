import React from "react";

function ErrorMessage({ error, errorStyle }) {
  return (
    <p style={errorStyle} className="sc-message--error">
      {error}
    </p>
  );
}

export default ErrorMessage;
