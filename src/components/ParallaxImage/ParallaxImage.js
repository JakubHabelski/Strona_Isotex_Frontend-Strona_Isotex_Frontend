import { useEffect, useRef } from "react";
import style from "./ParalaxImage.module.css";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function ParallaxImage() {
  const { t } = useTranslation();

  const parallaxRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const parallax = parallaxRef.current;
      const image = imageRef.current;
      const overlay = overlayRef.current;

      if (parallax && image && overlay) {
        const scrollPosition = window.scrollY;
        const sectionTop = parallax.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = parallax.offsetHeight; // ~40vh, np. 528px
        const offsetTop = parallax.offsetTop;
        const viewportTop = parallax.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Efekt paralaksy: obrazek przewija się wolniej (0.5x prędkość)
        const parallaxOffset = (scrollPosition - sectionTop) * 0.5;
        image.style.transform = `translate(-50%, calc(-50% + ${parallaxOffset}px))`;

        // Overlay: opacity od 0.5 do 1
        const overlayProgress = Math.min(Math.max((scrollPosition - sectionTop) / sectionHeight, 0), 1);
        const overlayOpacity = 0.5 + overlayProgress * 0.5;
        overlay.style.opacity = overlayOpacity;
        /*
        console.log('Parallax:', {
          offsetTop,
          offsetHeight: sectionHeight,
          scrollPosition,
          sectionTop,
          viewportTop,
          windowHeight,
          scrollY_plus_windowHeight: scrollPosition + windowHeight,
          parallaxOffset,
          overlayOpacity,
        }); */
      } else {
        console.log('Refs missing:', {
          parallax: parallaxRef.current,
          image: imageRef.current,
          overlay: overlayRef.current,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={style.parallax} ref={parallaxRef}>
      <img
        src="/assets/Parallax/1.jpeg"
        alt={t('Parallax.image_alt')}
        className={style.parallax__image}
        ref={imageRef}
      />
      <div className={style.parallax__overlay} ref={overlayRef} />
      <div className={style.parallax__text} ref={textRef}>
        <h1>{t('Parallax.title')}</h1>
        <p>{t('Parallax.description')}</p>
        <Button variant="outline-danger" className={style.parallax__button}>
          <a href="/certyfikaty" className={style.parallax__button_link}>
            {t('Parallax.button_text')}
          </a>
        </Button>
      </div>
    </div>
  );
}