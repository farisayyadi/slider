import "./slider.scss";
import "./slider-data.js";
import { useState, useEffect } from "react";
import { BsArrowRightSquareFill, BsArrowLeftSquareFill } from "react-icons/bs";
import { sliderData } from "./slider-data.js";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;
  const autoSlide = true;
  let slideInterval;

  function auto() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    autoSlide && auto();
    return () => clearInterval(slideInterval);
  });

  return (
    <div className="slider">
      <BsArrowLeftSquareFill
        className="slider-arrow prev"
        onClick={prevSlide}
      />
      <BsArrowRightSquareFill
        className="slider-arrow next"
        onClick={nextSlide}
      />

      {sliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img
                  className="slider-image"
                  src={process.env.PUBLIC_URL + slide.image}
                  alt={slide.heading}
                />
                <div className="content">
                  <h2 className="slider-header">{slide.heading}</h2>
                  <p className="slider-paragraph">{slide.desc}</p>
                  <hr />
                  <button className="slider-button">Get Started</button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Slider;
