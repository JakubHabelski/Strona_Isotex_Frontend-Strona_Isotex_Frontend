import React, { useEffect } from 'react';
import Navbar_v2 from '../../components/Navbar_v2/Navbar';
import Footer from '../../components/Footer';
import style from './Home.module.css'

function Banner(){

  useEffect(() => {
      const imgs = document.querySelectorAll(`.${style.banner_right_img}`);
      const rotate = [-5, 10, -10, 5];
      const transformY = [-150, -150, 150, 150];
      const transformX = [100, 400, 100, 400];
      const zIndex = [1,2,3,4]

      if (imgs.length > 0) {
        imgs.forEach((img, index) => {
          const rotation = rotate[index % rotate.length]; // Cykl przez rotacje
          const yOffset = transformY[index % transformY.length]; // Cykl przez przesunięcia Y
          const xOffset = transformX[index % transformX.length]; // Cykl przez przesunięcia X
          img.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`; // Połączone transformacje
          img.style.zIndex = zIndex[index];
        });
      } else {
        console.log('No images found with class', style.banner_right_img);
      }
    }, []);

  return(
    <>
      <div className={style.home_banner}>
        <div className={style.banner_left}>
          <h1>
            Efektywność i Oszczędność Energii
          </h1>
          <h5>
            Poprzez projektowanie i produkcję na miarę Twoich potrzeb
          </h5>
          <div className={style.banner_left_cta}>
            <button>Dowiedz się więcej</button>
            <p>Oszczędzaj energię już dziś!</p>
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
function Futures(){
  return(
    <>
      <div className={style.Futures_container}>
        <div className={style.Futures_card}>
          <h1>
          Jakość
          </h1>
          <p>
            Nasze izolacje termiczne spełniają rygorystyczne standardy, co potwierdzają certyfikaty ISO 9001.
          </p>
        </div>
        <div className={style.Futures_card}>
          <h1>
          Technologia
          </h1>
          <p>
          Korzystamy z projektowania CAD 3D, co pozwala na precyzyjne dostosowanie izolacji do Twoich potrzeb.
          </p>
        </div>
        <div className={style.Futures_card}>
          <h1>
          Doświadczenie
          </h1>
          <p>
           Od 1994 roku zdobywamy wiedzę, która przekłada się na doskonałe izolacje termiczne. 
          </p>
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
    <Futures></Futures>
    <Footer></Footer>
    </>
    
);
}

export default Home;
