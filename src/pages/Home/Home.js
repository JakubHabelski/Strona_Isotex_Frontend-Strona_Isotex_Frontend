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
    

    // Wywołaj na start
    handleResize();

    // Nasłuchuj zmian
    mediaMax1600px.addEventListener('change', handleResize);
    mediaMax1300px.addEventListener('change', handleResize);
    mediaMax992px.addEventListener('change', handleResize);
    mediaMax768px.addEventListener('change', handleResize);
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
          <h1>
            Kompleksowe rozwiązania w zakresie izolacji termicznych
          </h1>
          <h5>
            Straty ciepła w instalacjach przemysłowych to kosztowny problem – mamy na to sposób! Zaprojektujemy i wyprodukujemy materace izolacyjne, które zwiększą efektywność Twoich systemów.
          </h5>
          <div className={style.banner_left_cta}>
            <a href='/AboutUs'>Dowiedz się więcej</a>
            <p>Poznaj nasze rozwiązania i zmniejsz emisję CO2 już teraz!</p>
          </div>
        </div>
        <div className={style.banner_right}>
          <img className={style.banner_right_img} src='/assets/mainpage/box-offer-a.jpeg'></img>
          <img className={style.banner_right_img} src='/assets/mainpage/box-offer-b.jpeg'></img>
          <img className={style.banner_right_img} src='/assets/mainpage/box-offer-c.jpeg'></img>
          <img className={style.banner_right_img} src='/assets/mainpage/box-offer-d.jpeg'></img>
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
        <p>W naszej ofercie znajdą Państwo szeroki wybór wysokiej jakości produktów, w tym nowoczesne materace izolacyjne, doskonałej jakości materace izo-standard, które spełniają najwyższe standardy izolacji termicznej i akustycznej, a także trwałe tkaniny techniczne oraz kompleksowy zestaw akcesoriów niezbędnych do realizacji różnorodnych projektów.</p>
        <p>Oferujemy także profesjonalne usługi wycinania w tkaninach oraz w innych materiałach z wykorzystaniem zaawansowanej technologii CNC, zapewniając precyzję i efektywność na każdym etapie produkcji. Nasze rozwiązania są projektowane z myślą o potrzebach klientów, oferując niezawodność i dostosowanie do specyficznych wymagań, co czyni nas liderem w branży izolacji i technik specjalnych.</p>
        <Button variant='outline-warning' style={{float:'right'}}>{t("shortinfo2.button")}</Button>
      </div>
    </div>
    </>
  )
}
function Catalog(){

  return(
    <>
    <div className={style.CatalogContainerBG}>
      <div className={style.CatalogContainer}>
        <div className={style.CatalogText}>
          <h1>Zobacz nasz najnowszy katalog!</h1>
          <p>Oferujemy Państwu nowoczesne systemy izolacji, w tym: wysokiej jakości materace izolacyjne, materace IZO-standard spełniające najwyższe standardy, trwałe tkaniny techniczne oraz szeroki wybór akcesoriów. Zapraszamy do zapoznania się z naszą ofertą i odkrycia niezawodnych rozwiązań dostosowanych do Państwa potrzeb.</p>
          <Button variant='outline-danger'>Pobierz</Button>
        </div>
        <img src='/assets\KATALOG_ISOTEX_GROUP_page-0001.jpg' className={style.CatalogImage}></img>
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
      <h1 className={style.Futures_H1}>Co nas wyróżnia?</h1>
      <div className={style.Futures_container}>        
        <div
          ref={(el) => (cardRefs.current[0] = el)}
          className={style.Futures_card}
        >
          <img src="assets/icons/icons8-quality-48.svg" alt="Jakość" />
          <h1>Jakość</h1>
          <p>
            Nasze izolacje termiczne spełniają rygorystyczne standardy, co potwierdzają certyfikaty ISO 9001. Wykorzystujemy najlepsze materiały, takie jak wełna mineralna, szklana i ceramiczna, aby zapewnić trwałość i efektywność. Dzięki temu nasze produkty gwarantują niezawodność nawet w najtrudnych warunkach przemysłowych.
          </p>
        </div>
        <div
          ref={(el) => (cardRefs.current[1] = el)}
          className={style.Futures_card}
        >
          <img src="assets/icons/icons8-technology-50_1.svg" alt="Technologia" />
          <h1>Technologia</h1>
          <p>
            Korzystamy z projektowania CAD 3D, co pozwala na precyzyjne dostosowanie izolacji do Twoich potrzeb. Nasze zaawansowane procesy produkcyjne wykorzystują wysokiej jakości materiały, takie jak wełna mineralna, silikon i teflon, zapewniając bezpieczeństwo i wydajność. Stosujemy także technologie odnawialne, minimalizując wpływ na środowisko i zwiększając efektywność energetyczną Twoich instalacji.
          </p>
        </div>
        <div
          ref={(el) => (cardRefs.current[2] = el)}
          className={style.Futures_card}
        >
          <img src="assets/icons/icons8-experience-50_1.svg" alt="Doświadczenie" />
          <h1>Doświadczenie</h1>
          <p>
            Od 1994 roku zdobywamy wiedzę, która przekłada się na doskonałe izolacje termiczne. Przez ponad 30 lat zrealizowaliśmy projekty w Polsce i za granicą, zyskując zaufanie klientów na całym świecie. Nasze doświadczenie pozwala nam oferować rozwiązania idealnie dopasowane do specyficznych wymagań każdej branży.
          </p>
        </div>
      </div>
    </>
  );
}

function OurProducts(){

  return(
    <>
    <div className={style.OurProductsBG}>
      <div className={style.OurProducts}>
        <h1>Nasze produkty</h1>
        <div className={style.OurProductsGrid}>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>Materace izolacyjne</h2>
              <p>Wysokiej jakości materace izolacyjne zapewniające doskonałą ochronę termiczną i akustyczną, dostosowane do potrzeb przemysłu.</p>
            </div>
            <img src="/assets/Linkedin/1615967129156.jpg" alt="Materace izolacyjne" />
          </div>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>Tkaniny</h2>
              <p>Trwałe i odporne tkaniny techniczne, idealne do specjalistycznych zastosowań w izolacji i ochronie przemysłowej.</p>
            </div>
            <img src="/assets/materials/fabrics/glass.jpg" alt="Tkaniny" />
          </div>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>Wypełnienia</h2>
              <p>Wypełnienia z wełny mineralnej i szklanej, oferujące doskonałą izolację i bezpieczeństwo w wymagających warunkach.</p>
            </div>
            <img src="/assets/materials/Fillings/welna-mineralna/welna_szklana.jpg" alt="Wypełnienia" />
          </div>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>Akcesoria</h2>
              <p>Kompleksowy zestaw akcesoriów, wspierający instalację i utrzymanie izolacji na najwyższym poziomie.</p>
            </div>
            <img src="/assets/whatsapp/IMG-20250528-WA0018.jpg" alt="Akcesoria" />
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
