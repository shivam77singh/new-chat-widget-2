import React, { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";

let currentSlide = 0;

function CarouselMessage({
  message,
  handleInputMessage = { handleInputMessage },
}) {
  const carousel = message[1].carousel;
  const len = carousel.length;
  const [myStyle, setMyStyle] = useState({});

  const [leftDiabled, setLeftDisabled] = useState(true);
  const [rightDiabled, setRightDisabled] = useState(false);

  const handleLeftClick = () => {
    if (leftDiabled) return;

    setRightDisabled(false);
    setLeftDisabled(false);
    currentSlide += 100;
    setMyStyle({ transform: `translateX(${currentSlide}%)` });
    if (currentSlide === 0) {
      setLeftDisabled(true);
    }
  };
  const handleRightClick = () => {
    if (rightDiabled) return;

    setLeftDisabled(false);

    setRightDisabled(false);
    currentSlide -= 100;
    setMyStyle({ transform: `translateX(${currentSlide}%)` });
    if (currentSlide == -(len - 1) * 100) {
      setRightDisabled(true);
    }
  };

  return (
    <div className="sc-message--carousel">
      <RiArrowLeftSLine
        style={!leftDiabled ? { opacity: "1" } : { opacity: "0.7" }}
        onClick={handleLeftClick}
        className="carousel-control-prev-icon"
        disabled={leftDiabled}
      />
      {carousel.map((item, index) => {
        return (
          <div className="sc-message--carouselitem" style={myStyle} key={index}>
            <img className="d-block" src={item.image_url} alt="First slide" />
            <div className="sc-message--carouselinfo">
              <h5>{item.title}</h5> <p>{item.subtitle}</p>
              <button>Buy Now</button> <button>Know more</button>
            </div>
          </div>
        );
      })}
      <RiArrowRightSLine
        style={!rightDiabled ? { opacity: "1" } : { opacity: "0.7" }}
        onClick={handleRightClick}
        className="carousel-control-next-icon"
        disabled={rightDiabled}
      />
    </div>
  );
}
export default CarouselMessage;
