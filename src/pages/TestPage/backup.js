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
