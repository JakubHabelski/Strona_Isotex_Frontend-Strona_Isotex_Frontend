import React, { useState } from 'react';
import styles from './ImageCarousel.module.css';


const ImageCarousel = () => {
    const images = [
        {
          src: '/assets/carousel/slide-a-1.jpeg',
          title: 'Polska dla Polaków',
          description: 'Tradycja, rodzina, własność!',
        },
        {
          src: '/assets/carousel/slide-a-2.jpeg',
          title: 'Stop lewactwu!',
          description: 'Nie damy się globalistom!',
        },
        {
          src: '/assets/carousel/slide-a-3.jpeg',
          title: 'Bóg, Honor, Ojczyzna',
          description: 'Wartości, które nas łączą.',
        },
      ];
      
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

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
                <h2>{image.title}</h2>
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
      </div>
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
  );
};

export default ImageCarousel;