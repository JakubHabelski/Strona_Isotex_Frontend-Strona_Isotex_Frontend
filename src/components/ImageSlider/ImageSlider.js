import { useState, useEffect, useRef } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import styles from "./ImageSlider.module.css";

export const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const autoplayInterval = 3000; // Przewijanie co 3 sekundy

  // Funkcje nawigacyjne
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, []);

  // Płynne przewijanie dla infinite scroll
  const getTranslateX = () => {
    return `-${currentIndex * (100 / getVisibleSlides())}%`;
  };

  // Liczba widocznych slajdów w zależności od szerokości ekranu
  const getVisibleSlides = () => {
    if (window.innerWidth >= 1024) return 4; // 4 slajdy na dużych ekranach
    if (window.innerWidth >= 768) return 2; // 2 slajdy na średnich
    return 1; // 1 slajd na małych
  };

  // Duplikowanie obrazów dla płynnego zapętlania
  const extendedImages = [
    ...images.slice(-getVisibleSlides()), // Obrazy na końcu dla zapętlania w lewo
    ...images,
    ...images.slice(0, getVisibleSlides()), // Obrazy na początku dla zapętlania w prawo
  ];

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.sliderTrack}
          style={{
            transform: `translateX(${getTranslateX()})`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {extendedImages.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img src={image.src} alt={image.alt} className={styles.image} />
            </div>
          ))}
        </div>
      </div>

      {/* Strzałki nawigacyjne */}
      <button
        onClick={handlePrev}
        className={`${styles.navButton} ${styles.prevButton}`}
      >
        <IconArrowLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={handleNext}
        className={`${styles.navButton} ${styles.nextButton}`}
      >
        <IconArrowRight className="h-6 w-6 text-white" />
      </button>

      {/* Kropki nawigacyjne */}
      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ""}`}
          ></button>
        ))}
      </div>
    </div>
  );
};