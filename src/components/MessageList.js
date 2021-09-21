import { prop } from "ramda";
import React, { useRef, useEffect } from "react";
import Message from "./Messages";

function MessageList({ messages, handleInputMessage }) {
  const element = useRef(null);
  const elementCurrent = prop("current", element);
  console.log(messages, messages.length, "pppppppppppppp");
  const totalMessages = messages.length;

  useEffect(() => {
    if (elementCurrent) {
      elementCurrent.scrollTop = elementCurrent.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="sc-message-list" ref={element}>
      {messages.map((message, index) => (
        <Message
          message={message}
          key={index}
          handleInputMessage={handleInputMessage}
          index={index}
          totalMessages={totalMessages}
        />
      ))}
    </div>
  );
}

export default MessageList;
