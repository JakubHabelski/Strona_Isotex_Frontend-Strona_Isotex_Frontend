import { useEffect } from 'react';
import Footer from '../../components/Footer';
import Navbar_v2 from '../../components/Navbar_v2/Navbar';
import style from './Fastenings.module.css'
import { useTranslation } from 'react-i18next';


function FasteningsInfo(){
  const {t} = useTranslation();
  useEffect(() => {
    const FasteningsType = document.querySelectorAll(`.${style.FasteningsType}`);

    const observer = new IntersectionObserver(
      (entries) => {
        // Sortuj entries po kolejności w DOM
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => {
            return Array.from(FasteningsType).indexOf(a.target) - Array.from(FasteningsType).indexOf(b.target);
          });

        visibleEntries.forEach((entry, idx) => {
          setTimeout(() => {
            entry.target.style.opacity = 1;
            entry.target.style.setProperty('transform', 'none', 'important');
          }, idx * 300); // 300ms odstępu między kolejnymi kartami
        });
      },
      { threshold: 0.9 }
    );

    FasteningsType.forEach((Futures_card) => {
      observer.observe(Futures_card);
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);






 useEffect(() => {
    const LeftSlide = document.querySelectorAll(`.${style.LeftSlide}`);
    const RightSlide = document.querySelectorAll(`.${style.RightSlide}`);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains(style.LeftSlide)) {
            entry.target.style.transform = 'translateX(0)';
            entry.target.style.opacity = 1;
          }
          if (entry.target.classList.contains(style.RightSlide)) {
            entry.target.style.transform = 'translateX(0)';
            entry.target.style.opacity = 1;
          }
        }
      });
    }, { threshold: 0.9 });

    LeftSlide.forEach((el) => observer.observe(el));
    RightSlide.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return(
    <>
    <div className={style.FasteningsInfoContainer}>
      <div className={style.Hero}>
        <h1>{t('Fastenings.hero.title')}</h1>
        <p>{t('Fastenings.hero.description')}</p>
      </div>
      <div className={style.FasteningsTypes}>
        <div className={style.FasteningsType}>
          <h2>{t('Fastenings.types.type1.title')}</h2>
          <img src="/assets/whatsapp/IMG-20250528-WA0043.jpg" alt={t('Fastenings.types.type1.image_alt')} />
        </div>
        <div className={style.FasteningsType}>
          <h2>{t('Fastenings.types.type2.title')}</h2>
          <img src="/assets/whatsapp/IMG-20250528-WA0061.jpg" alt={t('Fastenings.types.type2.image_alt')} />
        </div>
        <div className={style.FasteningsType}>
          <h2>{t('Fastenings.types.type3.title')}</h2>
          <img src="/assets/whatsapp/IMG-20250528-WA0078.jpg" alt={t('Fastenings.types.type3.image_alt')} />
        </div>
      </div>
      <div className={style.ImagesSliderContainer}>
        <div className={style.ImagesSlider}>
          <div className={style.LeftSlide}>
            <h2>{t('Fastenings.slider1.title')}</h2>
            <p>{t('Fastenings.slider1.description')}</p>
          </div>
          <div className={style.RightSlide}>
            <img src="/assets/whatsapp/IMG-20250528-WA0056.jpg" alt={t('Fastenings.slider1.image_alt')} />
          </div>
        </div>
        <div className={style.ImagesSlider}>
          <div className={style.LeftSlide}>
            <img src="/assets/whatsapp/IMG-20250528-WA0030.jpg" alt={t('Fastenings.slider2.image_alt')} />
          </div>
          <div className={style.RightSlide}>
            <h2>{t('Fastenings.slider2.title')}</h2>
            <p>{t('Fastenings.slider2.description')}</p>
          </div>
        </div>
        <div className={style.ImagesSlider}>
          <div className={style.LeftSlide}>
            <h2>{t('Fastenings.slider3.title')}</h2>
            <p>{t('Fastenings.slider3.description')}</p>
          </div>
          <div className={style.RightSlide}>
            <img src="/assets/whatsapp/IMG-20250528-WA0107.jpg" alt={t('Fastenings.slider3.image_alt')} />
          </div>
        </div>
      </div>
    </div>
    
    

    </>
  )
}





export default function Fastenings() {


  return (
    <>
      <Navbar_v2></Navbar_v2>
      <FasteningsInfo></FasteningsInfo>
      <Footer></Footer>
    </>
  );
}