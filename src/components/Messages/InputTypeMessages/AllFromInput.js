import React, { useEffect, useState } from "react";
import { FormValidator } from "../../FormValidation";
import { AiOutlineRight } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { BsPersonSquare } from "react-icons/bs";
import { SiMailDotRu } from "react-icons/si";
import { BiMessageSquareError } from "react-icons/bi";

function AllFromInput({ message, handleInputMessage }) {
  const [error, setError] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [inputValue, setInputValue] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [errorStyle, setErrorStyle] = useState({ display: "none" });
  const inputType = message[1].message.input;
  const messageHead = message[1].message.text;
  const singleInputStyle = { width: "350px" };

  useEffect(() => {
    if (inputType == "form") {
      const messageBody = message[1].message.init;
      const formFields = messageBody.formConfig.sections[0].fields;
      setFormFields(formFields);

      //INITIALIZING THE INPUTVALUE OF FORM
      let temp = {};
      formFields.forEach((field) => {
        field.forEach((subfield) => {
          const name = subfield.field;
          console.log(name, "nammeee", inputValue);
          temp = { ...temp, [name]: "" };
        });
      });
      setInputValue(temp);
    } else {
      //INITIALIZING THE INPUTVALUE OF FORM
      setInputValue({ ...inputValue, [inputType]: "" });
      setFormFields([
        [
          {
            field: `${inputType}`,
            required: true,
          },
        ],
      ]);
    }
  }, []);

  const handleError = (formFields, submit) => {
    let requiredArray = {};
    formFields.forEach((field) => {
      field.forEach((subfield) => {
        const req = subfield.required;
        const type = subfield.field;
        requiredArray[type] = req;
      });
    });
    let validateInput = {};

    for (const p in inputValue) {
      validateInput[p] = {
        value: inputValue[p],
        required: requiredArray[p],
      };
    }
    const err = FormValidator(validateInput);
    setError({ ...err });

    for (const p in err) {
      if (err[p]) {
        setErrorStyle({ display: "block" });
        return true;
      }
    }
    const tempError = {};
    let isError = false;
    for (const p in err) {
      if (inputValue[p] == "" && requiredArray[p] && err[p] == "") {
        tempError[p] = "This field is required";
        isError = true;
      }
    }
    if (isError && submit) {
      setError({ ...error, ...tempError });
      setErrorStyle({ display: "block" });
      return true;
    }
    return false;
  };
  useEffect(() => {
    handleError(formFields, false);
    console.log(inputValue, "inputVAlue", formFields);
  }, [inputValue]);

  const handleSubmit = (e, formFields) => {
    e.preventDefault();
    const buttonType = e.target.innerText;
    const isError = handleError(formFields, true);

    if (buttonType == "Submit" || inputType != "form") {
      if (isError) {
        setShowForm(true);
        return;
      }
      handleInputMessage({
        message: inputType == "form" ? "Submit" : `${inputValue[inputType]}`,
        value: inputValue,
      });
      setShowForm(false);
    } else {
      setShowForm(false);
      handleInputMessage({ message: "Cancel", value: {} });
    }
  };

  const handleUserInput = (value, type) => {
    setInputValue({ ...inputValue, [type]: value });
  };

  const renderIConType = (inputType) => {
    switch (inputType) {
      case "name":
        return <BsPersonSquare className="sc-message--inputavatar" />;
      case "phone":
        return <FiPhone className="sc-message--inputavatar" />;
      case "email":
        return <SiMailDotRu className="sc-message--inputavatar" />;
      case "age":
        return <BiMessageSquareError className="sc-message--inputavatar" />;
    }
  };

  const displayInputField = (field) => {
    const type = field.type;
    const inputName = field.field;
    switch (type) {
      case "large-text":
        return (
          <div className="sc-message--form-subfield">
            <p>{field.label}</p>
            <textarea
              style={{ resize: "vertical" }}
              cols="10"
              rows="3"
              charswidth="23"
              name="text_body"
              className="sc-message--form-input"
              type={type}
              name={inputName}
              value={inputValue[inputName]}
              onChange={(e) => handleUserInput(e.target.value, e.target.name)}
            ></textarea>
            {error[inputName] ? (
              <p style={errorStyle} className="sc-message--error">
                {error[inputName]}
              </p>
            ) : null}
          </div>
        );
      case "dropdown":
        return (
          <div className="sc-message--form-subfield">
            <p>{field.label}</p>
            <select
              name={inputName}
              id={inputName}
              className="sc-message--form-input"
              onChange={(e) => {
                handleUserInput(e.target.value, e.target.name);
              }}
            >
              <option value="none" selected disabled hidden>
                Select an Option
              </option>
              {field.config.options.map((option) => (
                <option value={option.label}>{option.label}</option>
              ))}
            </select>
            {error[inputName] ? (
              <p style={errorStyle} className="sc-message--error">
                {error[inputName]}
              </p>
            ) : null}
          </div>
        );
      default:
        return (
          <div className="sc-message--form-subfield">
            <p>{field.label}</p>
            <input
              className="sc-message--form-input"
              type={type}
              value={inputValue[type]}
              name={inputName}
              onChange={(e) => handleUserInput(e.target.value, e.target.name)}
            />
            {error[inputName] ? (
              <p style={errorStyle} className="sc-message--error">
                {error[inputName]}
              </p>
            ) : null}
          </div>
        );
    }
  };

  const displayAllFields = (field) => {
    return (
      <div className="sc-message--form-fields">
        {field.map((subfield) => {
          return displayInputField(subfield);
        })}
      </div>
    );
  };

  const displayForm = () => {
    let messageBody;
    let buttons;
    if (message[1].message.init) {
      messageBody = message[1].message.init;
      buttons = messageBody.formConfig.cta;
    }

    return (
      <form className="sc-message--form">
        {inputType == "form" ? null : renderIConType(inputType)}

        {/* rendering form fields */}
        {inputType === "form" ? (
          formFields.map((field) => {
            return displayAllFields(field);
          })
        ) : (
          <>
            <input
              className="sc-message--form-input"
              value={inputValue[inputType]}
              onChange={(e) => handleUserInput(e.target.value, inputType)}
              type="text"
              placeholder={`Enter your ${inputType} here`}
              style={{ paddingLeft: "30px" }}
            />
            {inputType === "form" ? null : (
              <p style={errorStyle} className="sc-message--error">
                {error[inputType]}
              </p>
            )}
          </>
        )}

        {/* rendering buttons */}
        {inputType == "form" ? (
          <div className="sc-message--form-btn">
            {Object.keys(buttons).map((btn) => {
              return (
                <button
                  onClick={(e) => handleSubmit(e, formFields)}
                  type={buttons[btn].label}
                >
                  {buttons[btn].label}
                </button>
              );
            })}
          </div>
        ) : (
          <AiOutlineRight
            type="Submit"
            onClick={(e) => handleSubmit(e, formFields)}
            className="sc-message--inputbtn"
          />
        )}
      </form>
    );
  };

  return (
    <div
      className="sc-message--form-container"
      style={inputType == "form" ? {} : singleInputStyle}
    >
      {inputType == "form" ? <h4>{messageHead}</h4> : messageHead}

      {showForm && displayForm()}
    </div>
  );
}

export default AllFromInput;
