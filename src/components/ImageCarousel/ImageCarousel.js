import React, { useState, useEffect, useRef } from 'react';
import styles from './ImageCarousel.module.css';
import { useTranslation } from 'react-i18next';

const ImageCarousel = () => {
  const { t } = useTranslation();
  const titleRefs = useRef([]); // Tablica refów dla każdego <h2>
  const [maxTitleHeight, setMaxTitleHeight] = useState(null); // Stan dla maksymalnej wysokości

  const images = [
    {
      src: '/assets/carousel/slide-a-1.jpeg',
      title: t("carousel.title1"),
      description: t("carousel.text1"),
    },
    {
      src: '/assets/carousel/slide-a-2.jpeg',
      title: t("carousel.title2"),
      description: t("carousel.text2"),
    },
    {
      src: '/assets/carousel/slide-a-3.jpeg',
      title: t("carousel.title3"),
      description: t("carousel.text3"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Mierzymy maksymalną wysokość <h2> po wyrenderowaniu
  useEffect(() => {
    const heights = titleRefs.current.map((ref) => ref?.getBoundingClientRect().height || 0);
    const maxHeight = Math.max(...heights);
    setMaxTitleHeight(maxHeight);
  }, [t]); // Ponowne przeliczenie, jeśli zmieni się tłumaczenie

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <div
          className={styles.slidesWrapper}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img
                src={image.src}
                alt={image.title}
                className={styles.slideImage}
              />
              <div className={styles.overlay}>
                <h2
                  ref={(el) => (titleRefs.current[index] = el)} // Przypisujemy ref do każdego <h2>
                  style={{ height: maxTitleHeight ? `${maxTitleHeight}px` : 'auto' }} // Ustawiamy wysokość
                >
                  {image.title}
                </h2>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.prev} onClick={prevSlide}>
          ❮
        </button>
        <button className={styles.next} onClick={nextSlide}>
          ❯
        </button>
        <div className={styles.dots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;