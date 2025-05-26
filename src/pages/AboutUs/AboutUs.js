import { Container, Row } from 'react-bootstrap'
import Footer from '../../components/Footer'
import Navbar_v2 from '../../components/Navbar_v2/Navbar'
import style from './AboutUs.module.css'
import Gradient_banner from '../../components/Gradient-banner/Gradient-banner'
import SimpleBanner from '../../components/SimpleBanner/SimpleBanner'
import { useTranslation } from 'react-i18next'


function HoverImage() {
  const { t } = useTranslation();

  const images = [
    {
      src: "/assets/mainpage/box-offer-a.jpeg",
      shortText: t("hoverImage.image1.short"),
      fullText: t("hoverImage.image1.full"),
    },
    {
      src: "/assets/mainpage/box-offer-b.jpeg",
      shortText: t("hoverImage.image2.short"),
      fullText: t("hoverImage.image2.full"),
    },
    {
      src: "/assets/mainpage/box-offer-c.jpeg",
      shortText: t("hoverImage.image3.short"),
      fullText: t("hoverImage.image3.full"),
    },
    {
      src: "/assets/mainpage/box-offer-d.jpeg",
      shortText: t("hoverImage.image4.short"),
      fullText: t("hoverImage.image4.full"),
    },
  ];

  return (
    <>
      <h1>{t("HoverImage.WhatWeDo")}</h1>
      <div className="image-container">
        {images.map((image, index) => (
          <div className="image-hover" key={index}>
            <img src={image.src} alt={image.shortText} />
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


function AboutUsPage(){
    return(
        <Container>
        
        <div className={style.view}>
            <div className={style.block}>
                <div className={style.FirstBlock}>
                
               <div>
                <h1>Firma produkcyjna isoTex</h1>
                <p>Firma produkcyjna isoTex ma siedzibę w miejscowości Syców na terenie województwa dolnośląskiego. Specjalizujemy się w produkcji elementów ochronnych do instalacji oraz rozmaitych urządzeń wykorzystywanych w przemyśle. W ofercie mamy m.in. izolacje i materace zabezpieczające przed utratą ciepła. Działamy w tej branży od blisko 30 lat. W tym czasie dobrze poznaliśmy potrzeby naszych Klientów, dzięki czemu obecnie w ofercie mamy produkty, które spełnią wszelkie ich oczekiwania.</p>
                <p>Wytwarzane przez nas produkty znajdują zastosowanie w wielu różnorodnych branżach, gdzie konieczna jest ochrona instalacji przemysłowych i ciepłowniczych przed stratami grzewczymi. Dokładamy wszelkich starań, aby nasze produkty wyróżniały się najwyższą jakością, ponieważ tylko w ten sposób możemy sprostać oczekiwaniom Klientów. W związku z tym korzystamy wyłącznie z najlepszych materiałów, jakie są dostępne na rynku.</p>
               </div>
                
                 <img src='/assets/OurProjects/Valves/1.jpeg' alt='img'></img>
            </div>
            </div>
            <div className={style.block}>
                <HoverImage/>
            </div>
            <div className={style.block}>
                <div className={style.SecondBlock}>
                    <div style={{display: "flex", justifyItems: "center", alignItems: "center"}}>
                        <img src='assets\icons\professionalism.png' className={style.professionalism_icon}></img>
                    </div>
                    <div>
                        <h1>Co wyróżnia firmę isoTex?</h1>
                        <p>Firmę isoTex tworzą doświadczeni i wykwalifikowani specjaliści. Oprócz tego wyróżnia nas: </p> 
                        <ul>
                            <li>kompleksowość usług – zajmujemy się projektowaniem, produkcją, sprzedażą i montażem izolacji,</li>
                            <li>najwyższa jakość – produkty wykonujemy z najlepszych materiałów, a do tego mamy certyfikat ISO 9001</li>
                            <li>technologia – produkowane przez nas materiały izolacyjne są bezpieczne i wydajne.</li>
                        </ul>
                        <p>Do każdego zadania podchodzimy indywidualnie, ponieważ zdajemy sobie sprawę z tego, że Klienci mają różne potrzeby i oczekiwania względem ochronnych izolacji i otulin. Ponadto zapewniamy konkurencyjne ceny i przejrzyste warunki współpracy.</p>
                        <p>Jeżeli mają Państwo pytania, prosimy o skontaktowanie się z naszymi pracownikami. Udzielimy szczegółowych informacji o ofercie i współpracy.</p>
                    </div>
                </div>   
            </div>
            <div className={style.block}>
                
            </div>
            <div className={style.block}>
                
            </div>
            <div className={style.block}>
                
            </div>
       
            
        </div>
        </Container>
    )
}



export default function AboutUs(){
    return(
        <div style={{backgroundImage: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"}}>
        <Navbar_v2/>
        <SimpleBanner/>
        <AboutUsPage/>
        <Footer/>
        </div>
    )
}