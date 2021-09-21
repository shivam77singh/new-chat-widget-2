import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Launcher } from "../../src";
import messageHistory from "./messageHistory";
import TestArea from "./TestArea";
import Header from "./Header";
import Footer from "./Footer";
import monsterImgUrl from "./../assets/monster.png";
import "./../assets/styles";
import { makePostRequest } from "./makePostRequest";

function Demo() {
  const [state, setState] = useState({
    messageList: messageHistory,
    newMessagesCount: 0,
    isOpen: false,
    fileUpload: false,
  });

  function onMessageWasSent(message) {
    setState((state) => ({
      ...state,
      messageList: [...state.messageList, message],
    }));
  }

  function onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);

    setState((state) => ({
      ...state,
      messageList: [
        ...state.messageList,
        {
          type: "file",
          author: "me",
          data: {
            url: objectURL,
            fileName: fileList[0].name,
          },
        },
      ],
    }));
  }

  function sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = state.isOpen
        ? state.newMessagesCount
        : state.newMessagesCount + 1;

      setState((state) => ({
        ...state,
        newMessagesCount: newMessagesCount,
        messageList: [
          ...state.messageList,
          {
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      }));
    }
  }

  function onClick() {
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
      newMessagesCount: 0,
    }));
  }

  const handleInputMessage = ({ message, value }) => {
    makePostRequest(value);
    const text = message;
    const temp = [
      "sjfskfjk-39-bb44-42322-35388ff1233",
      {
        channel: "channelName",
        direction: "local",
        timeOfMessage: 1630854240971,
        message: {
          type: "text",
          text,
        },
        sender: {
          name: "Web ",
          gender: "unknown",
        },
        metadata: {
          source: "webapp",
          recipientID: "borosil",
          senderID: "27054a91-a4e6-4dd7-9299-6df9f8afdcfe",
          timeOfMessage: 1630854240971,
        },
      },
    ];
    onMessageWasSent(temp);
  };

  return (
    <div>
      {/* <Header /> */}

      {/* <TestArea onMessage={sendMessage} /> */}

      <Launcher
        agentProfile={{
          teamName: "popup-chat-react",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        handleInputMessage={handleInputMessage}
        onMessageWasSent={onMessageWasSent}
        onFilesSelected={onFilesSelected}
        messageList={state.messageList}
        newMessagesCount={state.newMessagesCount}
        onClick={onClick}
        isOpen={state.isOpen}
        showEmoji
        fileUpload={state.fileUpload}
        pinMessage={{
          id: 123,
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          title:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        }}
        onPinMessage={(value) => console.log(value)}
        placeholder="placeholder"
      />

      {/* <img className="demo-monster-img" src={monsterImgUrl} />
      <Footer /> */}
    </div>
  );
}

render(<Demo />, document.querySelector("#demo"));
