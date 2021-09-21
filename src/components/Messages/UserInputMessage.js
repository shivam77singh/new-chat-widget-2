import React from "react";

function UserInputMessage(message) {
  const text = message.message[1].message.text;
  return <div className="sc-message--text">{text}</div>;
}

export default UserInputMessage;
