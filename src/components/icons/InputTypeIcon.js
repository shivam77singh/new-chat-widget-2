import React from "react";
import { FiPhone } from "react-icons/fi";
import { BsPersonSquare } from "react-icons/bs";
import { SiMailDotRu } from "react-icons/si";
import { BiMessageSquareError } from "react-icons/bi";

export const InputTypeIcon = (inputType) => {
  switch (inputType) {
    case "name":
      return <BsPersonSquare className="sc-message--inputavatar" />;
    case "phone":
      return <FiPhone className="sc-message--inputavatar" />;
    case "email":
      return <SiMailDotRu className="sc-message--inputavatar" />;
    case "age":
      return <BiMessageSquareError className="sc-message--inputavatar" />;
    default:
      return null;
  }
};
