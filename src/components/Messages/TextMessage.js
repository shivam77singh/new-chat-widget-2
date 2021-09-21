import React from "react";
import Linkify from "react-linkify";

const TextMessage = ({ message }) => {
  const text = message[1].message.text;
  return <div className="sc-message--text">{text}</div>;
};

export default TextMessage;
