import { Button, Container, Row } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Navbar_v2 from '../../components/Navbar_v2/Navbar';
import style from './AboutUs.module.css';
import Gradient_banner from '../../components/Gradient-banner/Gradient-banner';
import SimpleBanner from '../../components/SimpleBanner/SimpleBanner';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import OrderProcedure from './OrderProcedure/OrderProcedure';
import WhatWeOffer from './WhatWeOffer/WhatWeOffer';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { baseURL, logoURL, faviconURL } from '../../config';

function HoverImage() {
  const { t } = useTranslation();

  const images = [
    {
      src: '/assets/mainpage/box-offer-a.jpeg',
      shortText: t('HoverImage.image1.short'),
      fullText: t('HoverImage.image1.full'),
    },
    {
      src: '/assets/mainpage/box-offer-b.jpeg',
      shortText: t('HoverImage.image2.short'),
      fullText: t('HoverImage.image2.full'),
    },
    {
      src: '/assets/mainpage/box-offer-c.jpeg',
      shortText: t('HoverImage.image3.short'),
      fullText: t('HoverImage.image3.full'),
    },
    {
      src: '/assets/mainpage/box-offer-d.jpeg',
      shortText: t('HoverImage.image4.short'),
      fullText: t('HoverImage.image4.full'),
    },
  ];

  return (
    <>
      <h1>{t('HoverImage.title')}</h1>
      <div className="image-container">
        {images.map((image, index) => (
          <div className="image-hover" key={index}>
            <img src={image.src} alt={t(`HoverImage.image${index + 1}.alt`)} />
            <div className="short-text">{image.shortText}</div>
            <div className="overlay">
              <div className="full-text">{image.fullText}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function AboutUsPage() {
  const { t } = useTranslation();

useEffect(() => {
  // Najpierw przewiń do góry
  window.scrollTo(0, 0);

  // Odłóż start IntersectionObservera o jedną klatkę
  const timeout = setTimeout(() => {
    const LeftSlide = document.querySelectorAll(`.${style.LeftSlide}`);
    const RightSlide = document.querySelectorAll(`.${style.RightSlide}`);
    const ImagesSlider = document.querySelectorAll(`.${style.ImagesSlider}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.children[0].style.opacity = 1;
            entry.target.children[0].style.transform = 'translateX(0)';
            entry.target.children[1].style.opacity = 1;
            entry.target.children[1].style.transform = 'translateX(0)';
          }
        });
      },
      { threshold: 0.5 }
    );

    ImagesSlider.forEach((el) => observer.observe(el));

    // Sprzątanie
    return () => observer.disconnect();
  }, 0); // lub np. 50ms jeśli masz dużo obrazków

  return () => clearTimeout(timeout);
}, []);

  return (
    <>
      <div className={style.AboutUsContainer}>
        <h1>{t('AboutUsPage.title')}</h1>
        <div className={style.ImagesSlider}>
          <div className={style.LeftSlide}>
            <h2>{t('AboutUsPage.section1.title')}</h2>
            <p>{t('AboutUsPage.section1.description')}</p>
          </div>
          <div className={style.RightSlide}>
            <img
              src="assets/whatsapp/IMG-20250528-WA0031.jpg"
              alt={t('AboutUsPage.section1.image_alt')}
            />
          </div>
        </div>
        <div>
          <div className={style.ImagesSlider}>
            <div className={style.LeftSlide}>
              <img
                src="assets/whatsapp/IMG-20250528-WA0021.jpg"
                alt={t('AboutUsPage.section2.image_alt')}
              />
            </div>
            <div className={style.RightSlide}>
              <h2>{t('AboutUsPage.section2.title')}</h2>
              <p>{t('AboutUsPage.section2.description')}</p>
            </div>
          </div>
        </div>
        <div className={style.ImagesSlider}>
          <div className={style.LeftSlide}>
            <h2>{t('AboutUsPage.section3.title')}</h2>
            <p>{t('AboutUsPage.section3.description')}</p>
          </div>
          <div className={style.RightSlide}>
            <img
              src="assets/whatsapp/IMG-20250528-WA0054.jpg"
              alt={t('AboutUsPage.section3.image_alt')}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function AboutUs() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
          <title>{t('page_titles.AboutUs.AboutUs')}</title>
          <meta name="description" content={t('AboutUsPage.meta.description')} />
          <meta name="keywords" content={t('AboutUsPage.meta.keywords')} />
          <meta name="robots" content="index, follow" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={t('page_titles.AboutUs')} />
          <meta name="twitter:description" content={t('AboutUsPage.meta.description')} />
          <meta name="twitter:image" content={logoURL} />
          <meta property="og:title" content={t('page_titles.AboutUs')} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={logoURL} />
          <meta property="og:url" content={`${baseURL}/o-nas`} />
          <meta property="og:description" content={t('AboutUsPage.meta.description')} />
          <meta property="og:site_name" content="Isotex Group Ilona Żurawa" />
          <link rel="canonical" href={`${baseURL}/o-nas`} />
          <link rel="icon" type="image/png" href={faviconURL} />
          <script type="application/ld+json">{`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "${t('page_titles.AboutUs')}",
              "description": "${t('AboutUsPage.meta.description')}",
              "url": "${baseURL}/o-nas",
              "publisher": {
                "@type": "Organization",
                "name": "Isotex Group",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${logoURL}"
                },
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Syców",
                  "addressCountry": "PL"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "email": "kontakt@isotex-poland.com",
                  "url": "${baseURL}/kontakt"
                }
              }
            }
          `}</script>
      </Helmet>
      <Navbar_v2 />
      <AboutUsPage />
      <OrderProcedure />
      <WhatWeOffer />
      <div className={style.CTA}>
        <h2>{t('AboutUs.cta.title')}</h2>
        <p>{t('AboutUs.cta.description')}</p>
        <Button variant="outline-danger" onClick={() => navigate('/kontakt')}>
          {t('AboutUs.cta.button')}
        </Button>
      </div>
      <Footer />
    </>
  );
}