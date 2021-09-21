import PropTypes from "prop-types";
import React, { Component } from "react";
import SendIcon from "./icons/SendIcon";
import FileIcon from "./icons/FileIcon";
import EmojiIcon from "./icons/EmojiIcon";
import PopupWindow from "./popups/PopupWindow";
import EmojiPicker from "./emoji-picker/EmojiPicker";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { makePostRequest } from "../../demo/src/makePostRequest";

class UserInput extends Component {
  constructor() {
    super();
    this.state = {
      inputActive: false,
      inputHasText: false,
      emojiPickerIsOpen: false,
      emojiFilter: "",
      windowStyle: { backgroundColor: "black", opacity: "0.5" },
      menuStyle: { display: "none" },
    };
  }

  componentDidMount() {
    this.emojiPickerButton = document.querySelector("#sc-emoji-picker-button");
  }

  handleKeyDown(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      return this._submitText(event);
    }
  }

  handleKeyUp(event) {
    const inputHasText =
      event.target.innerHTML.length !== 0 && event.target.innerText !== "\n";
    this.setState({ inputHasText });
  }

  _showFilePicker() {
    this._fileUploadButton.click();
  }

  toggleEmojiPicker = (e) => {
    e.preventDefault();
    if (!this.state.emojiPickerIsOpen) {
      this.setState({ emojiPickerIsOpen: true });
    }
  };

  closeEmojiPicker = (e) => {
    if (this.emojiPickerButton.contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ emojiPickerIsOpen: false });
  };

  _submitText(event) {
    event.preventDefault();
    const text = this.userInput.textContent;
    let obj = { text };
    obj = JSON.stringify(obj);

    makePostRequest(obj);
    if (text && text.length > 0) {
      this.props.onSubmit([
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
      ]);
      this.userInput.innerHTML = "";
    }
  }

  _onFilesSelected(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.props.onFilesSelected(event.target.files);
    }
  }

  _handleEmojiPicked = (emoji) => {
    this.setState({ emojiPickerIsOpen: false });
    if (this.state.inputHasText) {
      this.userInput.innerHTML += emoji;
    } else {
      makePostRequest({ emoji });
      this.props.onSubmit({
        author: "me",
        type: "emoji",
        data: { emoji },
      });
    }
  };

  handleEmojiFilterChange = (event) => {
    const emojiFilter = event.target.value;
    this.setState({ emojiFilter });
  };

  _renderEmojiPopup = () => (
    <PopupWindow
      isOpen={this.state.emojiPickerIsOpen}
      onClickedOutside={this.closeEmojiPicker}
      onInputChange={this.handleEmojiFilterChange}
    >
      <EmojiPicker
        onEmojiPicked={this._handleEmojiPicked}
        filter={this.state.emojiFilter}
      />
    </PopupWindow>
  );

  _renderSendOrFileIcon() {
    if (!this.props.fileUpload) {
      return (
        <div className="sc-user-input--button">
          <SendIcon onClick={this._submitText.bind(this)} />
        </div>
      );
    }

    if (this.state.inputHasText) {
      return (
        <div className="sc-user-input--button">
          <SendIcon onClick={this._submitText.bind(this)} />
        </div>
      );
    }

    return (
      <div className="sc-user-input--button">
        <FileIcon onClick={this._showFilePicker.bind(this)} />
        <input
          type="file"
          name="files[]"
          multiple
          ref={(e) => {
            this._fileUploadButton = e;
          }}
          onChange={this._onFilesSelected.bind(this)}
        />
      </div>
    );
  }
  handleMenu = () => {
    if (this.state.menuStyle.display === "none") {
      this.setState({ ...this.state, menuStyle: { display: "flex" } });
    } else {
      this.setState({ ...this.state, menuStyle: { display: "none" } });
    }
  };

  render() {
    const { emojiPickerIsOpen, inputActive } = this.state;
    return (
      <form className={`sc-user-input ${inputActive ? "active" : ""}`}>
        {this.state.open ? (
          <CgClose className="sc-user-input--menu" onClick={this.handleMenu} />
        ) : (
          <GiHamburgerMenu
            className="sc-user-input--menu"
            onClick={this.handleMenu}
          />
        )}

        <div className="sc-user-input--menu-links" style={this.state.menuStyle}>
          <li>Main Menu</li>
          <li>Product Enquiry</li>
          <li>Product Registration</li>
          <li>Request After Sales Service</li>
        </div>
        <div
          role="button"
          tabIndex="0"
          onFocus={() => {
            this.setState({ inputActive: true });
          }}
          onBlur={() => {
            this.setState({ inputActive: false });
          }}
          ref={(e) => {
            this.userInput = e;
          }}
          onKeyDown={this.handleKeyDown.bind(this)}
          onKeyUp={this.handleKeyUp.bind(this)}
          contentEditable="true"
          placeholder={this.props.placeholder}
          className="sc-user-input--text"
        />

        <div className="sc-user-input--buttons">
          <div className="sc-user-input--button" />

          <div className="sc-user-input--button">
            {this.props.showEmoji && (
              <EmojiIcon
                onClick={this.toggleEmojiPicker}
                isActive={emojiPickerIsOpen}
                tooltip={this._renderEmojiPopup()}
              />
            )}
          </div>

          {this._renderSendOrFileIcon()}
        </div>
      </form>
    );
  }
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
};

export default UserInput;
