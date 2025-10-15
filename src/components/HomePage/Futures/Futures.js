import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import style from './Futures.module.css'

export default function Futures() {
  const { t , i18n} = useTranslation(); // Zakładam, że useTranslation jest zdefiniowane
  const cardRefs = useRef([]);
   const h1Refs = useRef([]);

   useEffect(() => {
    // Ustaw wysokość wszystkich h1 na wysokość największego
    const heights = h1Refs.current.map(h1 => h1?.offsetHeight || 0);
    const maxHeight = Math.max(...heights);
    h1Refs.current.forEach(h1 => {
      if (h1) h1.style.minHeight = `${maxHeight}px`;
    });
  }, [i18n.language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => {
            return cardRefs.current.indexOf(a.target) - cardRefs.current.indexOf(b.target);
          });

        visibleEntries.forEach((entry, idx) => {
          setTimeout(() => {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'none'; // Usunąłem 'important', bo nie jest tu potrzebne
          }, idx * 300);
        });
      },
      { threshold: 0.5 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
     <>
      <h1 className={style.Futures_H1}>{t('Features.title')}</h1>
      <div className={style.Futures_container}>
        <div ref={el => (cardRefs.current[0] = el)} className={style.Futures_card}>
          <img src="assets/icons/icons8-quality-48.svg" alt={t('Features.card1.image_alt')} loading="lazy"/>
          <h1 ref={el => (h1Refs.current[0] = el)}>{t('Features.card1.title')}</h1>
          <p>{t('Features.card1.description')}</p>
        </div>
        <div ref={el => (cardRefs.current[1] = el)} className={style.Futures_card}>
          <img src="assets/icons/icons8-technology-50_1.svg" alt={t('Features.card2.image_alt')} loading="lazy"/>
          <h1 ref={el => (h1Refs.current[1] = el)}>{t('Features.card2.title')}</h1>
          <p>{t('Features.card2.description')}</p>
        </div>
        <div ref={el => (cardRefs.current[2] = el)} className={style.Futures_card}>
          <img src="assets/icons/icons8-experience-50_1.svg" alt={t('Features.card3.image_alt')} loading="lazy"/>
          <h1 ref={el => (h1Refs.current[2] = el)}>{t('Features.card3.title')}</h1>
          <p>{t('Features.card3.description')}</p>
        </div>
      </div>
    </>
  );
}