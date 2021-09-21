import React, { useState, useEffect } from "react";

function QuickReplyMessage({
  message,
  handleInputMessage,
  index,
  totalMessages,
}) {
  const [showQuickReply, setShowquickReply] = useState(true);
  const text = message[1].message.text;
  const options = [...message[1].message.quickReply];

  useEffect(() => {
    // console.log(index, totalMessages, "inside quickrepy");
    // if (index === totalMessages - 1) setShowquickReply(true);
    // else setShowquickReply(false);
  }, []);

  const handleSubmit = (value) => {
    let obj = { text: value, payload: "" };
    obj = JSON.stringify(obj);
    handleInputMessage({
      message: value,
      value: obj,
    });
    setShowquickReply(false);
  };

  return (
    <div className="sc-message--quickreply">
      <div className="sc-message--text">{text}</div>
      {showQuickReply && (
        <div className="sc-message--options">
          {options.map((option, index) => {
            return (
              <span
                key={index}
                onClick={(e) => handleSubmit(option.title)}
                className="sc-message--option"
              >
                {option.title}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default QuickReplyMessage;
