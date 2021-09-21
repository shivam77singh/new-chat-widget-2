import React, { useState } from "react";

function ListItemMessages({ message, handleInputMessage }) {
  const [showListItem, setShowListItem] = useState(true);
  const text = message[1].message.text;
  const options = [...message[1].message.quickReply];
  const type = "quickReply";

  const handleSubmit = (value) => {
    let obj = { text: value, payload: "" };
    obj = JSON.stringify(obj);
    handleInputMessage({
      message: value,
      value: obj,
    });
    setShowListItem(false);
  };

  return (
    <div
      className={`${
        showListItem ? "sc-message--list-items" : "sc-message--text"
      } `}
    >
      <div className={showListItem && "sc-message--list-text"}>{text}</div>
      <ul className="sc-message--list">
        {showListItem &&
          options.map((option, index) => {
            return (
              <li
                className="sc-message--item"
                key={index}
                onClick={(e) => handleSubmit(option.title)}
              >
                {option.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default ListItemMessages;
