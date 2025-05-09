import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import style from './Carousel.module.css';
import { useTranslation } from 'react-i18next';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className={style.carousel_container}>
      <Carousel.Item className={style.carousel_item}>
        <img src="/assets/carousel/slide-a-1.jpeg" alt="First slide" style={{ width: "100%", height: "100%" }} />
        <Carousel.Caption>
          <h3>{t("carousel.title1")}</h3>
          <p className={style.paragraf}>{t("carousel.text1")}</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className={style.carousel_item}>
        <img src="/assets/carousel/slide-a-2.jpeg" alt="Second slide" style={{ width: "100%", height: "100%" }} />
        <Carousel.Caption>
          <h3>{t("carousel.title2")}</h3>
          <p className={style.paragraf}>{t("carousel.text2")}</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className={style.carousel_item}>
        <img src="/assets/carousel/slide-a-3.jpeg" alt="Third slide" style={{ width: "100%", height: "100%" }} />
        <Carousel.Caption>
          <h3>{t("carousel.title3")}</h3>
          <p className={style.paragraf}>{t("carousel.text3")}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
