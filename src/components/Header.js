import React, { useState } from "react";
import closeIcon from "./../assets/close-icon.png";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { BiVolumeMute } from "react-icons/bi";

function Header(props) {
  const [linksStyle, setLinksStyle] = useState({ display: "none" });

  const displayMenuLinks = () => {
    setLinksStyle({ display: "flex" });
  };
  const hideMenuLinks = () => {
    setLinksStyle({ display: "none" });
  };

  return (
    <div className="sc-header" onMouseLeave={hideMenuLinks}>
      <img className="sc-header--img" src={props.imageUrl} alt="" />
      <div className="sc-header--team-name"> {props.teamName} </div>
      <div className="sc-header--menu">
        <BiDotsVerticalRounded
          onMouseOver={displayMenuLinks}
          className="sc-header--menu-icon"
        />
        <CgClose
          className="sc-header--close-button"
          onMouseOver={hideMenuLinks}
          onClick={props.onClose}
        />

        <div
          className="sc-header-menu-links"
          style={linksStyle}
          onMouseLeave={hideMenuLinks}
        >
          <div className="sc-header--menu-link">
            <AiOutlineMail className="sc-header--menu-link-icon" />
            <p>Email Transcript</p>
          </div>
          <div className="sc-header--menu-link">
            <BiVolumeMute className="sc-header--menu-link-icon" />
            <p>Turn off Sound</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
