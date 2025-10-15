import { useTranslation } from 'react-i18next';
import style from './Banner.module.css'
import { useEffect } from 'react';

export default function Banner(){
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


      const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const imgIndex = Array.from(imgs).indexOf(entry.target);
          const rotation = rotate[imgIndex % rotate.length];
          const yOffset = transformY[imgIndex % transformY.length];
          const xOffset = transformX[imgIndex % transformX.length];
          // Opóźnienie 1 sekunda
          setTimeout(() => {
            entry.target.style.transform = `translate(${xOffset}, ${yOffset}) rotate(${rotation}deg)`;
            if (mediaMax768px.matches) {
              entry.target.style.transform = `none`;
            }
            entry.target.style.zIndex = zIndex[imgIndex];
          }, 100); // 1000ms = 1s
        }
      });
    }, {
      threshold: 0.9
    });

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
        <img className={style.banner_right_img} src='/assets/mainpage/box-offer-a.jpeg' alt={t('Banner.image_alt_a')} loading="lazy"/>
        <img className={style.banner_right_img} src='/assets/mainpage/box-offer-b.jpeg' alt={t('Banner.image_alt_b')} loading="lazy"/>
        <img className={style.banner_right_img} src='/assets/mainpage/box-offer-c.jpeg' alt={t('Banner.image_alt_c')} loading="lazy"/>
        <img className={style.banner_right_img} src='/assets/mainpage/box-offer-d.jpeg' alt={t('Banner.image_alt_d')} loading="lazy"/>
      </div>
    </div>
    </>
  )
}