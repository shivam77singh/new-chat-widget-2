import { prop, equals } from "ramda";
import React from "react";
import classNames from "classnames";
import TextMessage from "./TextMessage";
import EmojiMessage from "./EmojiMessage";
import FileMessage from "./FileMessage";
import CarouselMessage from "./CarouselMessage";
import QuickReplyMessage from "./QuickReplyMessage";
import ListItemMessages from "./ListItemMessages";
import chatIconUrl from "./../../assets/chat-icon.svg";
import UserInput from "../UserInput";
import UserInputMessage from "./UserInputMessage";
import FormInput from "./InputTypeMessages/FormInput";

function Message({ message, handleInputMessage, index, totalMessages }) {
  const type = message[1];
  const author = prop("author", message);
  const me = message[1].channel === "channelName";

  function renderMessageOfType(type) {
    if (me) {
      return <UserInputMessage message={message} />;
    } else if (type.carousel) {
      return (
        <CarouselMessage
          message={message}
          handleInputMessage={handleInputMessage}
        />
      );
    } else if (type.message.quickReply) {
      const options = type.message.quickReply;
      const maxLength = options.reduce((len, option) => {
        return Math.max(len, option.title.length);
      }, 0);

      if (maxLength < 20) {
        return (
          <QuickReplyMessage
            message={message}
            handleInputMessage={handleInputMessage}
            index={index}
            totalMessages={totalMessages}
          />
        );
      } else {
        return (
          <ListItemMessages
            message={message}
            handleInputMessage={handleInputMessage}
          />
        );
      }
    } else if (type.message.input) {
      return (
        <FormInput message={message} handleInputMessage={handleInputMessage} />
      );
    } else if (type.message.text) {
      return <TextMessage message={message} />;
    } else {
      console.log(`default'`);
    }
  }

  return (
    <div className="sc-message">
      <div className={`sc-message--content ${me ? "sent" : "received"}`}>
        <div
          className="sc-message--avatar"
          // style={{
          //   backgroundImage: `url(${chatIconUrl})`,
          // }}
        />

        {renderMessageOfType(type)}
      </div>
    </div>
  );
}

export default Message;
