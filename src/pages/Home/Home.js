import React, { useEffect, useRef } from 'react';
import Navbar_v2 from '../../components/Navbar_v2/Navbar';
import Footer from '../../components/Footer';
import style from './Home.module.css'
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import OurProjects from '../../components/OurProjects/OurProjects';
import JoinUs from '../../components/JoinUs/JoinUs';
import OurTeam from '../../components/OurTeam/OutTeam';
import ParallaxImage from '../../components/ParallaxImage/ParallaxImage';

function Banner(){
  const { t } = useTranslation();

  useEffect(() => {
    console.log("Banner useEffect fired");
  // ...reszta kodu
    const banner_left = document.querySelectorAll(`.${style.banner_left}`)
    const imgs = document.querySelectorAll(`.${style.banner_right_img}`);
    const rotate = [-5, 10, -10, 5];
    let transformY = [];
    let transformX = [];
    const zIndex = [1,2,3,4];
    const mediaMax1600px = window.matchMedia('(max-width: 1600px)');
    const mediaMax1300px = window.matchMedia('(max-width: 1300px)');
    const mediaMax1100px = window.matchMedia('(max-width: 1100px)');
    const mediaMax992px = window.matchMedia('(max-width: 992px)');
    const mediaMax768px = window.matchMedia('(max-width: 768px)');
    const handleResize = () => {
      // Ustaw przesunięcia zależnie od szerokości
      if(mediaMax768px.matches){
        transformY = ['0', '0', '0', '0'];
        transformX = ['0', '0', '0', '0'];
      } else if(mediaMax992px.matches){
        transformY = ['-100%', '-100%', '0%', '0%'];
        transformX = ['20%', '120%', '20%', '120%'];
      } else if(mediaMax1100px.matches){
        transformY = ['-100%', '-100%', '0%', '0%'];
        transformX = ['20%', '120%', '20%', '120%'];
      } else if(mediaMax1300px.matches){
        transformY = ['-100%', '-100%', '0%', '0%'];
        transformX = ['50%', '150%', '50%', '150%'];
      } else if(mediaMax1600px.matches){
        transformY = ['-80%', '-80%', '20%', '20%'];
        transformX = ['50%', '150%', '50%', '150%'];
      } else {
        transformY = ['-100%', '-100%', '0%', '0%'];
        transformX = ['50%', '150%', '50%', '150%'];
      }


      const observer = new IntersectionObserver((entries) =>{
        entries.forEach((entry, index) =>{
          if(entry.isIntersecting){
            const imgIndex = Array.from(imgs).indexOf(entry.target);
            const rotation = rotate[imgIndex % rotate.length];
            const yOffset = transformY[imgIndex % transformY.length];
            const xOffset = transformX[imgIndex % transformX.length];
            entry.target.style.transform = `translate(${xOffset}, ${yOffset}) rotate(${rotation}deg)`;
            if(mediaMax768px.matches){
            entry.target.style.transform = `none`;
          }
            entry.target.style.zIndex = zIndex[imgIndex];
          }
        })
      },
      {
        threshold: 0.9
      }
    )

    imgs.forEach((img) =>{
      observer.observe(img)
    })

    const banner_left_observer = new IntersectionObserver((entries) =>{
      entries.forEach((entry) =>{
        if(entry.isIntersecting){
          entry.target.style.scale =1.2;
        }
      })
    })
    banner_left.forEach((e) =>{
      banner_left_observer.observe(e)
    })
      // Ustaw style dla obrazków

      /*
      if (imgs.length > 0) {
        imgs.forEach((img, index) => {
          const rotation = rotate[index % rotate.length];
          const yOffset = transformY[index % transformY.length];
          const xOffset = transformX[index % transformX.length];
          img.style.transform = `translate(${xOffset}, ${yOffset}) rotate(${rotation}deg)`;
          if(mediaMax768px.matches){
          img.style.transform = `none`;
        }
          img.style.zIndex = zIndex[index];
        });
      }
        */
    };

    const setTransformTo0 = () =>{
      imgs.forEach((img)=>{
        img.style.transform = 'translate(0)';
      })
    }
    setTransformTo0();
    

    // Wywołaj na start
    handleResize();

    // Nasłuchuj zmian
    mediaMax1600px.addEventListener('change', handleResize);
    mediaMax1300px.addEventListener('change', handleResize);
    mediaMax992px.addEventListener('change', handleResize);
    mediaMax768px.addEventListener('change', handleResize);
    mediaMax768px.addEventListener('change', setTransformTo0);
    // Sprzątanie
    return () => {
      mediaMax1600px.removeEventListener('change', handleResize);
      mediaMax1300px.removeEventListener('change', handleResize);
      mediaMax992px.removeEventListener('change', handleResize);
      mediaMax768px.removeEventListener('change', handleResize);

    };
  }, []);

   

  return(
    <>
      <div className={style.home_banner}>
      <div className={style.banner_left}>
        <h1>{t('Banner.title')}</h1>
        <h5>{t('Banner.description')}</h5>
        <div className={style.banner_left_cta}>
          <a href='/AboutUs'>{t('Banner.learn_more')}</a>
          <p>{t('Banner.cta_text')}</p>
        </div>
      </div>
      <div className={style.banner_right}>
        <img className={style.banner_right_img} src='/assets/mainpage/box-offer-a.jpeg' alt={t('Banner.image_alt_a')} />
        <img className={style.banner_right_img} src='/assets/mainpage/box-offer-b.jpeg' alt={t('Banner.image_alt_b')} />
        <img className={style.banner_right_img} src='/assets/mainpage/box-offer-c.jpeg' alt={t('Banner.image_alt_c')} />
        <img className={style.banner_right_img} src='/assets/mainpage/box-offer-d.jpeg' alt={t('Banner.image_alt_d')} />
      </div>
    </div>
    </>
  )
}

function WhatWeOfferBanner(){
  const { t } = useTranslation();

  return(
    <>
    <div className={style.WhatWeOfferBanner}>
      <div className={style.WhatWeOfferBannerText}>
        <p>{t('WhatWeOfferBanner.paragraph1')}</p>
        <p>{t('WhatWeOfferBanner.paragraph2')}</p>
        <Button variant='outline-warning' style={{ float: 'right' }}>
          {t('shortinfo2.button')}
        </Button>
      </div>
    </div>
    </>
  )
}
function Catalog(){
const { t } = useTranslation();
  return(
    <>
    <div className={style.CatalogContainerBG}>
      <div className={style.CatalogContainer}>
        <div className={style.CatalogText}>
          <h1>{t('Catalog.title')}</h1>
          <p>{t('Catalog.description')}</p>
          <Button href='/assets/KATALOG_ISOTEX_GROUP.pdf' variant='outline-danger'>
            {t('Catalog.download_button')}
          </Button>
        </div>
        <img
          src='/assets/KATALOG_ISOTEX_GROUP_page-0001.jpg'
          className={style.CatalogImage}
          alt={t('Catalog.image_alt')}
        />
      </div>
    </div>
    
    
    
    </>
  )
}

function Futures() {
  const { t } = useTranslation(); // Zakładam, że useTranslation jest zdefiniowane
  const cardRefs = useRef([]);

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
        <div
          ref={(el) => (cardRefs.current[0] = el)}
          className={style.Futures_card}
        >
          <img
            src="assets/icons/icons8-quality-48.svg"
            alt={t('Features.card1.image_alt')}
          />
          <h1>{t('Features.card1.title')}</h1>
          <p>{t('Features.card1.description')}</p>
        </div>
        <div
          ref={(el) => (cardRefs.current[1] = el)}
          className={style.Futures_card}
        >
          <img
            src="assets/icons/icons8-technology-50_1.svg"
            alt={t('Features.card2.image_alt')}
          />
          <h1>{t('Features.card2.title')}</h1>
          <p>{t('Features.card2.description')}</p>
        </div>
        <div
          ref={(el) => (cardRefs.current[2] = el)}
          className={style.Futures_card}
        >
          <img
            src="assets/icons/icons8-experience-50_1.svg"
            alt={t('Features.card3.image_alt')}
          />
          <h1>{t('Features.card3.title')}</h1>
          <p>{t('Features.card3.description')}</p>
        </div>
      </div>
    </>
  );
}

function OurProducts(){
  const { t } = useTranslation();
  return(
    <>
    <div className={style.OurProductsBG}>
      <div className={style.OurProducts}>
        <h1>{t('OurProducts.title')}</h1>
        <div className={style.OurProductsGrid}>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>{t('OurProducts.product1.title')}</h2>
              <p>{t('OurProducts.product1.description')}</p>
            </div>
            <img
              src="/assets/Linkedin/1615967129156.jpg"
              alt={t('OurProducts.product1.image_alt')}
            />
          </div>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>{t('OurProducts.product2.title')}</h2>
              <p>{t('OurProducts.product2.description')}</p>
            </div>
            <img
              src="/assets/materials/fabrics/glass.jpg"
              alt={t('OurProducts.product2.image_alt')}
            />
          </div>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>{t('OurProducts.product3.title')}</h2>
              <p>{t('OurProducts.product3.description')}</p>
            </div>
            <img
              src="/assets/materials/Fillings/welna-mineralna/welna_szklana.jpg"
              alt={t('OurProducts.product3.image_alt')}
            />
          </div>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>{t('OurProducts.product4.title')}</h2>
              <p>{t('OurProducts.product4.description')}</p>
            </div>
            <img
              src="/assets/whatsapp/IMG-20250528-WA0018.jpg"
              alt={t('OurProducts.product4.image_alt')}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

function Shortinfo2() {
  const { t } = useTranslation();

  useEffect(() => {
  const textBlock = document.querySelectorAll(`.${style.textBlock}`);


  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          //entry.target.style.backgroundColor = 'blue';
          entry.target.style.setProperty('transform', 'none', 'important');
          
        } else {
          
        }
      });
    },
    { threshold: 0.9 }
  );
  textBlock.forEach((text_element) =>{
    observer.observe(text_element)
  })
  }, []);

  return (
    <div className={style.Shortinfo2}>
      <div className={style.textBlock}>
        <h2 className={style.h2_custom}>
          Producent izolacji termicznych <b>IsoTex</b> z siedzibą w Komorowie, woj. dolnośląskie
        </h2>
        <p>Zabezpieczamy instalacje przemysłowe przed utratą ciepła od 1994 roku</p>
        <ul>
          <li>Produkujemy wysokiej jakości izolacje termiczne </li>
          <li>Oferujemy kompleksowe usługi: projektowanie, produkcję i montaż </li>
          <li>Wykorzystujemy bezpieczne i wydajne technologie </li>
          <li>Zapewniamy fachowe wsparcie na każdym etapie współpracy </li>
        </ul>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button variant="outline-primary">{t("shortinfo2.button")}</Button>
        </div>
      </div>
      <img
        src="/assets/about-us-page.jpeg"
        alt={t("shortinfo2.imageAlt")}
        className={style.imageBlock}
      />
    </div>
  );
}

function WideHeadLineWithPhoto(){
  const { t } = useTranslation();


  useEffect(()=>{
    const WideHeadLineWithPhotobg = document.querySelectorAll(`.${style.WideHeadLineWithPhotobg}`)


  const observer = new IntersectionObserver((elements) =>{
    elements.forEach((element) =>{
      if(element.isIntersecting){
        element.target.style.transform = "translateY(0px)"
        element.target.style.opacity = 1;
      }
    })
  }, {
    threshold: 0.9
  }
)

 WideHeadLineWithPhotobg.forEach((e) =>{
  observer.observe(e);
 })
  }, [])
  return(
    <>
    <div className={style.WideHeadLineWithPhotobg}>
      <div className={style.WideHeadLineWithPhoto}>
        <div className={style.WideHeadLineWithPhotoOverlay}>
          <div className={style.textBlock}>
          <h2 className={style.h2_custom}>
            Producent izolacji termicznych <b>IsoTex</b> z siedzibą w Komorowie, woj. dolnośląskie
          </h2>
          <p>Zabezpieczamy instalacje przemysłowe przed utratą ciepła od 1994 roku</p>
          <ul>
            <li>Produkujemy wysokiej jakości izolacje termiczne </li>
            <li>Oferujemy kompleksowe usługi: projektowanie, produkcję i montaż </li>
            <li>Wykorzystujemy bezpieczne i wydajne technologie </li>
            <li>Zapewniamy fachowe wsparcie na każdym etapie współpracy </li>
          </ul>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Button variant="outline-danger">{t("shortinfo2.button")}</Button>
          </div>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}


function Panel_Imageleft_TextSlide_Right(){
  useEffect(() => {
  const text_elements = document.querySelectorAll(`.${style.text_element}`);


  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          //entry.target.style.backgroundColor = 'blue';
          entry.target.style.setProperty('transform', 'none', 'important');
          
        } else {
          
        }
      });
    },
    { threshold: 0.9 }
  );
  text_elements.forEach((text_element) =>{
    observer.observe(text_element)
  })
  }, []);

  return(
    <>
    <div className={style.Panel_Imageleft_TextSlide_Right}>
      <div className={style.panel_left}>
        <img className={style.img_bg} src='assets\OurProjects\Valves\1.jpeg'></img>
        <img className={style.img_cover} src='assets\OurProjects\Valves\2-Photoroom.png'></img>
      </div>
      <div className={style.panel_right}>
        <h1>Dlaczego warto z nami współpracować?</h1>
        <div className={style.text_container}>
          <div className={style.text_element}>
            <div>
              <img src='assets\icons\icons8-experience-50_1.svg'></img>
              <h5></h5>
              <p>Od 1994 roku produkujemy najlepsze izolacje, które skutecznie chronią przed stratami ciepła. Zamów i przekonaj się o ich niezrównanej wydajności.</p>
            </div>
            <div>
              <img src='assets/icons/icons8-quality-48.svg'></img>
            <h5></h5>
            <p>Nasze materace izolacyjne spełniają rygorystyczne standardy ISO 9001, zapewniając doskonałą ochronę termiczną. Sprawdź, jak dobrze działają w Twojej instalacji.</p>
            </div>
            
          </div>
          <div className={style.text_element}>
            <div>
              <img src='assets\icons\icons8-durability-64.svg'></img>
              <h5></h5>
              <p>Tworzymy izolacje termiczne, które zatrzymują ciepło na lata, dzięki zaawansowanym materiałom i precyzji. Zamów i poczuj różnicę w efektywności energetycznej.</p>
            </div>
            <div>
              <img src='assets\icons\icons8-design-50.svg'></img>
            <h5></h5>
            <p>Projektujemy izolacje w technologii CAD 3D, idealnie dopasowane do Twoich potrzeb. Przekonaj się, jak skutecznie poprawiają wydajność Twoich urządzeń.</p>
            </div>
            
          </div>
          <div className={style.text_element}>
            <div>
              <img src='assets\icons\icons8-eco-driving-indicator-50.svg'></img>
              <h5></h5>
              <p>Nasze izolacje minimalizują straty energii i emisję CO2, wspierając Twój zrównoważony rozwój. Zamów i zobacz, jak mogą zoptymalizować Twoje instalacje.</p>
            </div>
            <div>
              <img src='assets\icons\icons8-services-50.svg'></img>
            <h5></h5>
            <p>Zapewniamy projektowanie, produkcję, sprzedaż i montaż izolacji – wszystko w jednym miejscu. Skontaktuj się i skorzystaj z naszej pełnej obsługi.</p>
            </div>
            
          </div>
          <div className={style.text_element}>
            <div>
              <img src='assets\icons\icons8-worldwide-50.svg'></img>
              <h5></h5>
              <p>Realizujemy projekty w Polsce i za granicą, zawsze z dbałością o szczegóły. Zamów i doświadcz naszej międzynarodowej jakości.</p>
            </div>
            <div>
              <img src='assets\icons\icons8-3d-design-66.svg'></img>
            <h5></h5>
            <p>Wykorzystujemy nowoczesne technologie, takie jak CAD 3D, aby tworzyć izolacje o najwyższej wydajności. Przekonaj się, jak innowacyjność wspiera Twój biznes.</p>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
    </>
  )

}

function Home() {



  return (
    <>
    <Navbar_v2></Navbar_v2>
    <Banner></Banner>
    <WhatWeOfferBanner/>
    <Futures></Futures>
    <Catalog/>
    {/*
    
    <WideHeadLineWithPhoto></WideHeadLineWithPhoto>
       
    <Panel_Imageleft_TextSlide_Right></Panel_Imageleft_TextSlide_Right>
    */}
    
    <OurProjects></OurProjects>
    <OurProducts/>
    <ParallaxImage></ParallaxImage>
    <OurTeam></OurTeam>
    <JoinUs></JoinUs>
    <Footer></Footer>
    </>
    
);
}

export default Home;
