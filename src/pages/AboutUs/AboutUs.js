import { Button, Container, Row } from 'react-bootstrap'
import Footer from '../../components/Footer'
import Navbar_v2 from '../../components/Navbar_v2/Navbar'
import style from './AboutUs.module.css'
import Gradient_banner from '../../components/Gradient-banner/Gradient-banner'
import SimpleBanner from '../../components/SimpleBanner/SimpleBanner'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import OrderProcedure from './OrderProcedure/OrderProcedure'
import WhatWeOffer from './WhatWeOffer/WhatWeOffer'
import { useNavigate } from 'react-router-dom'


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

  useEffect(() => {
    const LeftSlide = document.querySelectorAll(`.${style.LeftSlide}`);
    const RightSlide = document.querySelectorAll(`.${style.RightSlide}`);
    const ImagesSlider = document.querySelectorAll(`.${style.ImagesSlider}`)

    console.log('style.LeftSlide:', style.LeftSlide);
    console.log('style.RightSlide:', style.RightSlide);

    RightSlide.forEach(el => console.log('RightSlide element:', el.className));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          entry.target.children[0].style.opacity = 1;
          entry.target.children[0].style.transform = "translateX(0)"
          entry.target.children[1].style.opacity = 1;
          entry.target.children[1].style.transform = "translateX(0)"
      }
      });
    }, { threshold: 0.5 });

    ImagesSlider.forEach((el) => observer.observe(el));
   // LeftSlide.forEach((el) => observer.observe(el));
   // RightSlide.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  

    return(
        <>
        <div className={style.AboutUsContainer}>
          <h1>Poznaj bliżej firmę Isotex Group</h1>
          <div className={style.ImagesSlider}>
            <div className={style.LeftSlide}>
              <h2>
                IsoTex – Eksperci w izolacjach termicznych od 1994 roku
              </h2>
              <p>
              Od 1994 roku produkujemy wysokiej jakości izolacje termiczne, które skutecznie chronią przed stratami ciepła. Nasze materace izolacyjne są projektowane z dbałością o każdy detal, aby zapewnić optymalną wydajność Twoich instalacji.             
              </p>
            </div>
            <div className={style.RightSlide}>
              <img src='assets\whatsapp\IMG-20250528-WA0031.jpg'></img>
            </div>
          </div>
          <div>
              <div className={style.ImagesSlider}>
              <div className={style.LeftSlide}>
                <img src='assets\whatsapp\IMG-20250528-WA0021.jpg'></img>
              </div>
              <div className={style.RightSlide}>
                <h2>
                  Kompleksowe rozwiązania dla Twojego przemysłu
                </h2>
                <p>
                  W isoTex nie tylko produkujemy izolacje, ale także oferujemy profesjonalny montaż na miejscu. Dzięki projektowaniu w technologii CAD 3D nasze materace zapewniają precyzyjne dopasowanie i minimalizują straty ciepła w instalacjach przemysłowych.
                </p>
              </div>
            </div>
          </div>
          
          <div className={style.ImagesSlider}>
            <div className={style.LeftSlide}>
              <h2>
                Zobowiązanie do zrównoważonego rozwoju
              </h2>
              <p>
                Nasze izolacje termiczne pomagają unikać strat ciepła, wspierając efektywność energetyczną i redukując emisję CO2. Produkujemy i montujemy rozwiązania, które dbają o środowisko i Twój biznes.
              </p>
            </div>
            <div className={style.RightSlide}>
              <img src='assets\whatsapp\IMG-20250528-WA0054.jpg'></img>
            </div>
          </div>          
        </div>



       
        </>
    )
}



export default function AboutUs(){
  const navigate = useNavigate();
  
    return(
        <>
        <Navbar_v2/>
        
        <AboutUsPage/>
        <OrderProcedure></OrderProcedure>
        <WhatWeOffer></WhatWeOffer>
        <div className={style.CTA}>
          <h2>Chcesz dowiedzieć się więcej?</h2>
          <p>
            Skontaktuj się z nami, aby omówić, jak nasze nowoczesne rozwiązania mogą zwiększyć efektywność Twoich instalacji.
          </p>
          <Button variant='outline-danger' onClick={() => navigate("/kontakt")}>Napisz do nas</Button>
        </div>
        <Footer/>
        </>
        
        
    )
}