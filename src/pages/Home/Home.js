import React, { lazy, Suspense, useEffect, useRef } from 'react';
import Navbar_v2 from '../../components/Navbar_v2/Navbar';
import style from './Home.module.css'
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import { Helmet } from 'react-helmet';
import { baseURL, apiURL, logoURL, faviconURL } from '../../config';
import Banner from '../../components/HomePage/Banner/Banner';


const WhatWeOfferBanner = lazy(() => import('../../components/HomePage/WhatWeOfferBanner/WhatWeOfferBanner'));
const Futures = lazy(() => import('../../components/HomePage/Futures/Futures'));
const Catalog = lazy(() => import('../../components/HomePage/Catalog/Catalog'));
const OurProjects = lazy(() => import('../../components/OurProjects/OurProjects'));
const OurProducts = lazy(() => import('../../components/HomePage/OurProducts/OurProducts'));
const ParallaxImage = lazy(() => import('../../components/ParallaxImage/ParallaxImage'));
const OurTeam = lazy(() => import('../../components/OurTeam/OutTeam'));
const JoinUs = lazy(() => import('../../components/JoinUs/JoinUs'));
const Footer = lazy(() => import('../../components/Footer'));
const LocationChangeModal = lazy(() => import('../../components/LocationChangeModal/LocationChangeModal'));


function Home() {
const { t } = useTranslation();


  return (
    <>
    <Helmet>
        <title>{t("page_titles.home")}</title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="google-site-verification" content="aWwprzmeqkJJ6B4dLTOtYODOLTkRFkqVthOadPcRJ0E" />
        <title>{t('page_titles.home')}</title>
        <meta name="description" content={t('home.meta.description')} />
        <meta name="keywords" content={t('home.meta.keywords')} />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('page_titles.home')} />
        <meta name="twitter:description" content={t('home.meta.description')} />
        <meta name="twitter:image" content={logoURL} />
        <meta property="og:title" content={t('page_titles.home')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={logoURL} />
        <meta property="og:url" content={`${baseURL}/`} />
        <meta property="og:description" content={t('home.meta.description')} />
        <meta property="og:site_name" content="Isotex Group Ilona Żurawa" />
        <link rel="canonical" href={`${baseURL}/`} />
        <link rel="icon" type="image/png" href={faviconURL} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "${t('page_titles.home')}",
            "description": "${t('home.meta.description')}",
            "url": "${baseURL}/",
            "publisher": {
              "@type": "Organization",
              "name": "Isotex Group",
              "logo": {
                "@type": "ImageObject",
                "url": "${logoURL}"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Daszyńskiego 9A",
                "addressLocality": "Syców",
                "postalCode": "56-500",
                "addressCountry": {
                  "@type": "Country",
                  "name": "PL"
                }
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "kontakt@isotex-poland.com",
                "url": "${baseURL}/kontakt"
              }
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "${baseURL}/Sklep?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Materace izolacyjne",
            "description": "Wysokiej jakości materace izolacyjne Isotex Group do izolacji termicznych rur, turbin i armatury. Zapewniają ochronę termiczną i akustyczną w przemyśle.",
            "brand": {
              "@type": "Brand",
              "name": "Isotex Group"
            },
            "offers": {
              "@type": "Offer",
              "url": "${baseURL}/MainPageShop",
              "priceCurrency": "PLN",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Isotex Group"
              }
            }
          }
        `}</script>
      </Helmet>
    <Navbar_v2></Navbar_v2>
    <Banner></Banner>
    <Suspense fallback={<div>Ładowanie...</div>}>
        <WhatWeOfferBanner />
        <Futures />
        <Catalog />
        <OurProjects />
        <OurProducts />
        <ParallaxImage />
        <OurTeam />
        <JoinUs />
        <Footer />
        <LocationChangeModal />
      </Suspense>
    
    </>
    
);
}

export default Home;
