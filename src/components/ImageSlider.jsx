import { useCallback, useEffect, useRef, useState } from "react";
import '../App.css';

export const ImageSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  const handlePrev = () => {
    if (currentSlide === 0) {
      setCurrentSlide(images.length - 1)
    } else {
      setCurrentSlide(currentSlide - 1)
    }
  };

  const handleNext = useCallback(() => {
    if (currentSlide === images.length - 1) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1)
    }
  }, [currentSlide, images])

  const handleGoToSlide = (index) => {
    setCurrentSlide(index)
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      handleNext();
    }, 3000)

    return () => clearTimeout(timerRef.current);
  }, [handleNext]);

  return (
    <div className="imageContainer">
      <button className="leftArrow" onClick={handlePrev}>
        ❰
      </button>
      <button className="rightArrow" onClick={handleNext}>
        ❱
      </button>
      <div
        style={{ backgroundImage: `url("${images[currentSlide].imageUrl}")` }}
        className="image"
      ></div>
      <div className="dotsContainer">
        {images.map((option, index) => (
          <div
            key={option.id}
            className="dot"
            onClick={() => handleGoToSlide(index)}
          >
          </div>
        ))}
      </div>
    </div>
  );
};
