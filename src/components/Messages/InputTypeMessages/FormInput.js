import React, { useEffect, useState } from "react";
import { FormValidator } from "../../FormValidation";
import { HiBan } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { InputTypeIcon } from "../../icons/InputTypeIcon";
import DropDownInput from "./inputFields/DropDownInput";
import AllOtherInput from "./inputFields/AllOtherInput";
import TextAreaInput from "./inputFields/TextAreaInput";
import FileInput from "./inputFields/FileInput";
import DropDown from "./inputFields/DropDown";
import DateInput from "./inputFields/DateInput";
import { set } from "ramda";

function FormInput({ message, handleInputMessage }) {
  const [error, setError] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [inputValue, setInputValue] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [errorStyle, setErrorStyle] = useState({ display: "none" });
  const [showTick, setShowTick] = useState(false);
  const inputType = message[1].message.input;
  const messageHead = message[1].message.text;
  const singleInputStyle = {};
  const isFormRequired = message[1].message.required;

  // <<<<<<<<<=====================INITIALIZING THE FORM FIELDS==========>>>>>>
  useEffect(() => {
    setShowTick(!isFormRequired);
    if (inputType === "form") {
      const messageBody = message[1].message.init;
      const formField = messageBody.formConfig.sections[0].fields;
      setFormFields(formField);
    } else {
      const required = message[1].message.required;
      const label = message[1].message.text;
      const type = message[1].message.input;
      const field = type;
      setFormFields([
        [
          {
            label,
            type,
            field,
            required,
          },
        ],
      ]);
    }
  }, []);
  useEffect(() => {
    let obj = {};
    formFields.forEach((field) => {
      field.forEach((subfield) => {
        const key = subfield.field;
        obj[key] = undefined;
      });
    });
    setInputValue(obj);
  }, [formFields]);

  //set the submit icon according to the form validaton
  const handleDisplayButtonIcon = (err) => {
    if (isFormRequired) {
      let isOk = true;
      formFields.forEach((field) => {
        field.forEach((subfiled) => {
          const f = subfiled.field;
          if (
            subfiled.required == true &&
            (err[f] || inputValue[f] == "" || inputValue[f] == undefined)
          )
            isOk = false;
        });
      });
      setShowTick(isOk);
    }
  };

  // <<<<<<<<<<=============HANDLES THE ERROR WHEN INPUTVALUE CHANGES============>>>>>>>>>>

  const handleError = (submit) => {
    const err = FormValidator(formFields, inputValue);

    handleDisplayButtonIcon(err);
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
      let req;
      formFields.forEach((field) => {
        field.forEach((subfield) => {
          if (subfield.field == p) req = subfield.required;
        });
      });
      if (
        (inputValue[p] == "" || inputValue[p] == undefined) &&
        req &&
        err[p] == ""
      ) {
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
    handleError(false);
  }, [inputValue]);

  // <<<<<<<<<<==========HANDLES SUBMIT FORM AND CHECKS ERRORS============>>>>>>>>>>

  const handleSubmit = (e) => {
    e.preventDefault();

    const btnType = e.target.name;
    const isError = handleError(true);
    if (isError == true && btnType == "submit") {
      return;
    }
    var formData = new FormData();

    Object.entries(inputValue).map((obj) => {
      const key = obj[0];
      const value = obj[1];
      formData.append([key], value);
    });

    const message =
      inputType === "form"
        ? `${e.target.innerText}`
        : `${inputValue[inputType]}`;
    handleInputMessage({
      message,
      value: formData,
    });
    setShowForm(false);
  };

  const handleUserInput = (value, type) => {
    setInputValue({ ...inputValue, [type]: value });
  };
  // <<<<<<<<<<==============DISPLAY THE FORM==================>>>>>>>>>>

  const displayInputField = (field) => {
    const type = field.type;
    const name = field.field;
    const { [field.field]: err } = error;

    switch (type) {
      case "date":
        return (
          <DateInput
            field={field}
            error={err}
            handleUserInput={handleUserInput}
            errorStyle={errorStyle}
            inputType={inputType}
            handleSubmit={handleSubmit}
          />
        );
        break;
      case "large-text":
        return (
          <TextAreaInput
            field={field}
            error={err}
            handleUserInput={handleUserInput}
            errorStyle={errorStyle}
          />
        );
      case "dropdown":
        const options = field.config.options;
        return (
          <DropDown
            field={field}
            error={err}
            handleUserInput={handleUserInput}
            errorStyle={errorStyle}
            inputType={inputType}
            options={options}
          />
        );
      case "file":
        return (
          <FileInput
            field={field}
            error={err}
            handleUserInput={handleUserInput}
            errorStyle={errorStyle}
            inputType={inputType}
          />
        );

      default:
        return (
          <AllOtherInput
            field={field}
            error={err}
            handleUserInput={handleUserInput}
            errorStyle={errorStyle}
            inputType={inputType}
            handleSubmit={handleSubmit}
          />
        );
    }
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
        {formFields.map((field, index) => {
          return (
            <div className="sc-message--form-fields" key={index}>
              {field.map((subfield, index) => {
                return displayInputField(subfield);
              })}
            </div>
          );
        })}

        {inputType === "form" && (
          <div className="sc-message--form-btn">
            {Object.keys(buttons).map((btn, index) => {
              return (
                <>
                  <button
                    onClick={(e) => handleSubmit(e)}
                    type={buttons[btn].label.toLowerCase()}
                    name={buttons[btn].label.toLowerCase()}
                  >
                    {buttons[btn].label}
                  </button>
                  {buttons[btn].label == "Submit" &&
                    (!showTick ? (
                      <HiBan className="sc-message--btn-icon" />
                    ) : (
                      <TiTick className="sc-message--btn-icon" />
                    ))}
                </>
              );
            })}
          </div>
        )}
      </form>
    );
  };

  return (
    <div
      className={showForm ? "sc-message--form-container" : "sc-message--text"}
      style={inputType == "form" ? {} : singleInputStyle}
    >
      {showForm && inputType == "form" && <h4>{messageHead}</h4>}

      {showForm && displayForm()}
      {!showForm && messageHead}
    </div>
  );
}

export default FormInput;
