import { useEffect } from 'react';
import Footer from '../../components/Footer';
import Navbar_v2 from '../../components/Navbar_v2/Navbar';
import style from './Fastenings.module.css'


function FasteningsInfo(){
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
      <h1>Zapięcia w isoTex – Dopasowane do Twoich potrzeb</h1>
      <p>
          W isoTex Group stosujemy różne typy zapięć, aby nasze materace izolacyjne były łatwe w montażu i demontażu, a jednocześnie trwałe w każdych warunkach. Poznaj nasze rozwiązania i dowiedz się, jak dobieramy zapięcia w zależności od zastosowania.
      </p>
    </div>
      <div className={style.FasteningsTypes}>
        <div className={style.FasteningsType}>
          <h2>Rzepy</h2>
          <img src='/assets/whatsapp/IMG-20250528-WA0043.jpg'></img>
        </div>
        <div className={style.FasteningsType}>
          <h2>Klamry</h2>
          <img src='/assets/whatsapp/IMG-20250528-WA0061.jpg'></img>
        </div>
        <div className={style.FasteningsType}>
          <h2>Haki</h2>
          <img src='/assets/whatsapp/IMG-20250528-WA0078.jpg'></img>
        </div>
      </div>
      <div className={style.ImagesSliderContainer}>
          <div className={style.ImagesSlider}>
            <div className={style.LeftSlide}>
              <h2>Rzepy – Prostota i wygoda</h2>
            <p>
              Rzepy stosujemy w temperaturach do 180°C, gdzie zapewniają najprostszy i najszybszy montaż oraz demontaż. To idealne rozwiązanie dla instalacji wymagających częstego dostępu.
            </p>
            </div>
            <div className={style.RightSlide}>
              <img src='/assets/whatsapp/IMG-20250528-WA0056.jpg'></img>
            </div>
          </div>
          
              <div className={style.ImagesSlider}>
              <div className={style.LeftSlide}>
                <img src='/assets/whatsapp/IMG-20250528-WA0030.jpg'></img>
              </div>
              <div className={style.RightSlide}>
                <h2>Klamry – Wytrzymałość w trudnych warunkach</h2>
            <p>
              Klamry wykorzystujemy, gdy temperatura przekracza 180°C, aby uniknąć uszkodzenia rzepów. Są idealne do instalacji na zewnątrz, gdzie rzepy mogą stracić przyczepność pod wpływem deszczu.
            </p>
              </div>
            </div>
          
          
          <div className={style.ImagesSlider}>
            <div className={style.LeftSlide}>
              <h2>Haki – Specjalistyczne rozwiązanie dla turbin</h2>
            <p>
              Haki stosujemy głównie w materacach na turbiny. Sąsiadujące materace są spinane drutem, co gwarantuje stabilność i precyzyjne dopasowanie w wymagających instalacjach.
            </p>
            </div>
            <div className={style.RightSlide}>
              <img src='/assets/whatsapp/IMG-20250528-WA0107.jpg'></img>
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