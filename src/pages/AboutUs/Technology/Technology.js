import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Dla linków do podstron
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import style from './Technology.module.css';
import Navbar_v2 from '../../../components/Navbar_v2/Navbar';
import Footer from '../../../components/Footer';
import { Button } from 'react-bootstrap';

gsap.registerPlugin(ScrollTrigger);

export default function Technology() {

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
          <h1>Technologia w isoTex – Precyzja i innowacje</h1>
          <p>
            W isoTex Group łączymy wieloletnie doświadczenie z nowoczesnymi technologiami, aby dostarczać izolacje termiczne najwyższej jakości. Poznaj nasz proces produkcji i dowiedz się, jak tworzymy materace izolacyjne, które spełniają najbardziej wymagające standardy.
          </p>
        </div>

        {/* Sekcja 1: Proces produkcji */}
        <div className={style.ImagesSlider}>
          <div className={style.LeftSlide}>
            <h2>Nasz proces produkcji – Krok po kroku</h2>
            <p>
              Każdy projekt w isoTex Group jest realizowany z dbałością o szczegóły, aby zapewnić najlepsze rezultaty. Nasz proces produkcji obejmuje następujące etapy:
            </p>
            <ul>
              <li><strong>Przyjmowanie zamówienia:</strong> Rozpoczynamy od przyjęcia zamówienia i szczegółowej analizy potrzeb klienta.</li>
              <li><strong>Projektowanie zgodnie z wytycznymi:</strong> Tworzymy indywidualny projekt, uwzględniając specyficzne wymagania instalacji, korzystając z technologii CAD 3D.</li>
              <li><strong>Produkcja z precyzją:</strong> Gotowy projekt trafia na produkcję, gdzie wykorzystujemy nowoczesne technologie, takie jak cutter do wycinania szablonów, co gwarantuje najwyższą precyzję.</li>
            </ul>
          </div>
          <div className={style.RightSlide}>
            <img src="/assets/CAD1.jpg" alt="Proces produkcji IsoTex" />
          </div>
        </div>

        {/* Sekcja 2: Materiały i komponenty */}
        <div className={style.ImagesSlider}>
          <div className={style.LeftSlide}>
            <img src="/assets/whatsapp/IMG-20250528-WA0017.jpg" alt="Materiały IsoTex" />
          </div>
          <div className={style.RightSlide}>
            <h2>Materiały i komponenty – Jakość w każdym detalu</h2>
            <p>
              Do produkcji naszych materaców izolacyjnych używamy starannie wyselekcjonowanych materiałów, wypełnień i zapięć, aby zapewnić trwałość i efektywność. Oferujemy szeroki wybór komponentów, takich jak:
            </p>
            <ul>
              <li><strong>Materiały zewnętrzne:</strong> Wełna mineralna, teflon, silikon i inne (szczegóły na podstronie <Link to="/fabrics">Materiały</Link>).</li>
              <li><strong>Wypełnienia:</strong> Wełna ceramiczna, folia aluminiowa i inne rozwiązania (zobacz <Link to="/wypelnienia">Wypełnienia</Link>).</li>
              <li><strong>Zapięcia:</strong> Haki, rzepy, paski – dla łatwego montażu i demontażu (dowiedz się więcej na <Link to="/zapięcia">Zapięcia</Link>).</li>
            </ul>
          </div>
        </div>

        {/* Sekcja 3: Precyzja dzięki technologii */}
        <div className={style.ImagesSlider}>
          <div className={style.LeftSlide}>
            <h2>Cutter – Gwarancja precyzji</h2>
            <p>
              W isoTex Group stawiamy na nowoczesne technologie, aby zapewnić najwyższą jakość. Używamy cuttera do wycinania szablonów, co pozwala nam osiągnąć niezrównaną precyzję i powtarzalność w produkcji materaców izolacyjnych.
            </p>
          </div>
          <div className={style.RightSlide}>
            <img src="/assets/cutter.png" alt="Cutter IsoTex" />
          </div>
        </div>

        {/* Sekcja CTA */}
        <div className={style.CTA}>
          <h2>Chcesz dowiedzieć się więcej o naszej technologii?</h2>
          <p>
            Skontaktuj się z nami, aby omówić, jak nasze nowoczesne rozwiązania mogą zwiększyć efektywność Twoich instalacji.
          </p>
          <Button variant='outline-danger'>Napisz do nas</Button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}