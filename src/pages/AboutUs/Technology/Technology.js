import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Dla linków do podstron
import style from './Technology.module.css';
import Navbar_v2 from '../../../components/Navbar_v2/Navbar';
import Footer from '../../../components/Footer';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


export default function Technology() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    useEffect(() =>{
        const LeftSlide = document.querySelectorAll(`.${style.LeftSlide}`)
        const RightSlide = document.querySelectorAll(`.${style.RightSlide}`)
        const ImagesSlider = document.querySelectorAll(`.${style.ImagesSlider}`)

        const observer = new IntersectionObserver ((entries) =>{
            entries.forEach((entry) =>{
                if(entry.isIntersecting){
                    entry.target.children[0].style.opacity = 1;
                    entry.target.children[0].style.transform = "translateX(0)"
                    entry.target.children[1].style.opacity = 1;
                    entry.target.children[1].style.transform = "translateX(0)"
                }
            })
        },
        {
            threshold: 0.5
        }
    )
    /*
        LeftSlide.forEach((e) =>{
            observer.observe(e)
        })
        RightSlide.forEach((e) =>{
            observer.observe(e)
        })
        */
       ImagesSlider.forEach((e) =>{
            observer.observe(e)
        })

    })

  return (
    <>
    <Navbar_v2></Navbar_v2>
      <div className={style.TechnologyContainer}>
        {/* Nagłówek */}
        <div className={style.Hero}>
          <h1>{t('Technology.hero.title')}</h1>
          <p>{t('Technology.hero.description')}</p>
        </div>

        {/* Sekcja 1: Proces produkcji */}
        <div className={style.ImagesSlider}>
          <div className={style.LeftSlide}>
            <h2>{t('Technology.section1.title')}</h2>
            <p>{t('Technology.section1.description')}</p>
            <ul>
              <li>
                <strong>{t('Technology.section1.list.item1.title')}</strong>{' '}
                {t('Technology.section1.list.item1.description')}
              </li>
              <li>
                <strong>{t('Technology.section1.list.item2.title')}</strong>{' '}
                {t('Technology.section1.list.item2.description')}
              </li>
              <li>
                <strong>{t('Technology.section1.list.item3.title')}</strong>{' '}
                {t('Technology.section1.list.item3.description')}
              </li>
            </ul>
          </div>
          <div className={style.RightSlide}>
            <img
              src="/assets/CAD1.jpg"
              alt={t('Technology.section1.image_alt')}
            />
          </div>
        </div>

        {/* Sekcja 2: Materiały i komponenty */}
        <div className={style.ImagesSlider}>
          <div className={style.LeftSlide}>
            <img
              src="/assets/whatsapp/IMG-20250528-WA0017.jpg"
              alt={t('Technology.section2.image_alt')}
            />
          </div>
          <div className={style.RightSlide}>
            <h2>{t('Technology.section2.title')}</h2>
            <p>{t('Technology.section2.description')}</p>
            <ul>
              <li>
                <strong>{t('Technology.section2.list.item1.title')}</strong>{' '}
                {t('Technology.section2.list.item1.description')}{' '}
                <Link to="/fabrics">{t('Technology.section2.list.item1.link')}</Link>
              </li>
              <li>
                <strong>{t('Technology.section2.list.item2.title')}</strong>{' '}
                {t('Technology.section2.list.item2.description')}{' '}
                <Link to="/wypelnienia">{t('Technology.section2.list.item2.link')}</Link>
              </li>
              <li>
                <strong>{t('Technology.section2.list.item3.title')}</strong>{' '}
                {t('Technology.section2.list.item3.description')}{' '}
                <Link to="/Fastenings">{t('Technology.section2.list.item3.link')}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sekcja 3: Precyzja dzięki technologii */}
        <div className={style.ImagesSlider}>
          <div className={style.LeftSlide}>
            <h2>{t('Technology.section3.title')}</h2>
            <p>{t('Technology.section3.description')}</p>
          </div>
          <div className={style.RightSlide}>
            <img
              src="/assets/cutter.png"
              alt={t('Technology.section3.image_alt')}
            />
          </div>
        </div>

        {/* Sekcja CTA */}
        <div className={style.CTA}>
          <h2>{t('Technology.cta.title')}</h2>
          <p>{t('Technology.cta.description')}</p>
          <Button variant="outline-danger">{t('Technology.cta.button')}</Button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}