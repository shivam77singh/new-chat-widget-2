const validate = (item) => {
  const { type, value, required } = item;

  let err = "";
  if (value === undefined) return err;
  if (value.length == 0) return err;
  switch (type) {
    case "email":
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase())) {
        err = "Please enter a valid email ID";
      }
      break;

    case "name":
      let name = new RegExp("^[A-Za-z./, ']+$");
      if (!value.match(name)) {
        err = "Please enter a valid name";
      }
      break;
    case "phone":
      const formatPhoneNumberOutput = (
        isValid,
        newNumber,
        countryData,
        fullNumber,
        isExtension
      ) => {
        if (!isValid && fullNumber !== "")
          err = "Please enter a valid phone number";
      };
      formatPhoneNumberOutput(...value);
      break;
    case "age":
      let age = /^[0-9]*$/;
      if (
        (value && !(value.match(age) && value.length <= 12)) ||
        value < 0 ||
        value > 100
      )
        err = "Please enter a valid age";
      break;
    case "number":
      let pin = /^[0-9]*$/;
      if (!value.match(pin)) {
        err = "Please enter a valid pin number";
      }
      break;
  }
  return err;
};

export const FormValidator = (formFields, inputValue) => {
  let errorObject = {};

  formFields.map((field) => {
    field.map((subfield) => {
      const type = subfield.type;
      const f = subfield.field;
      const err = validate({
        type,
        value: inputValue[f],
        required: subfield.required,
      });
      errorObject[f] = err;
    });
  });

  return errorObject;
};
