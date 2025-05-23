import Accordion from "react-bootstrap/Accordion";
import  { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import { Modal, Button } from "react-bootstrap";
import { MapPin, Phone, Mail } from "lucide-react";
import style from "./App.module.css";
import { useTranslation } from "react-i18next";
import "./i18n";
import { ImageSlider } from "./components/ImageSlider/ImageSlider";
import VideoHeader from "./components/VideoHeader/VideoHeader";
import OurProjects from "./components/OurProjects/OurProjects";
import Navbar_v2 from "./components/Navbar_v2/Navbar";
import ParallaxImage from "./components/ParallaxImage/ParallaxImage";
import OurTeam from "./components/OurTeam/OutTeam";
import JoinUs from "./components/JoinUs/JoinUs";

const images = [
  { src: "/assets/clients/iwg_isolier_wendt.jpeg", alt: "Image 1" },
  { src: "/assets/clients/wendt_noise.png", alt: "Image 2" },
  { src: "/assets/clients/atex.jpg", alt: "Image 3" },
  {
    src: "/assets/clients/Newag_Group_logo_2013_500x115.svg.png",
    alt: "Image 4",
  },
  {
    src: "/assets/clients/cropped-madrass-insulation-jackets-icon-1.jpg",
    alt: "Image 5",
  },
];

function LocationChangeModal() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  if (localStorage.getItem("modal_state") != 1) {
    localStorage.setItem("modal_state", 1);
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Zmiana Lokalizacji Firmy</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Informujemy, że firma Isotex Group zmieniła lokalizację. Wszystkie
              nasze usługi i produkty pozostają bez zmian.
            </p>
            <div className="contact-info">
              <p>
                <MapPin /> Nowy adres: ul. Daszyńskiego 9a 56-500 Syców
              </p>
              <p>
                <Phone /> Telefon: +48 600 511 029
              </p>
              <p>
                <Mail /> Email: info@isotex-poland.com{" "}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Dowiedz się więcej
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return <></>;
  }
}

function Shortinfo() {
  return (
    <div className="short_info_tab">
      <div>
        <img
          src="/assets/svg/check-svgrepo-com.svg"
          alt="check"
          style={{ height: "50px" }}
        ></img>
        Doświadczenie.<br></br> Mamy blisko 30-letnie doświadczenie w branży.
      </div>

      <div>
        <img
          src="/assets/svg/check-svgrepo-com.svg"
          alt="check"
          style={{ height: "50px" }}
        />
        Technologia <br></br>Produkujemy wydajne oraz bezpieczne produkty.
      </div>
      <div>
        <img
          src="/assets/svg/check-svgrepo-com.svg"
          alt="check"
          style={{ height: "50px" }}
        />
        Jakość <br></br>Oferujemy wysokiej jakości produkty izolacyjne.
        Posiadamy certryfikat ISO 9001
      </div>
      <div>
        <img
          src="/assets/svg/check-svgrepo-com.svg"
          alt="check"
          style={{ height: "50px" }}
        />
        Kompleksowość <br></br>Zajmujemy się sprzedażą, projektowaniem,
        produkcją i montażem izolacji.{" "}
      </div>
    </div>
  );
}

function Shortinfo2() {
  const { t } = useTranslation();

  return (
    <div className={style.Shortinfo2}>
      <div className={style.textBlock}>
        <h2 className={style.h2_custom}>
          {t("shortinfo2.heading")} <b>IsoTex</b>
        </h2>
        <p>{t("shortinfo2.paragraph")}</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button variant="outline-danger">{t("shortinfo2.button")}</Button>
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

function Shortinfo3() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("shortinfo3.title")}</h1>
      <div className={style.Shortinfo3}>
        <div>
          <img
            src="/assets/svg/check-svgrepo-com.svg"
            alt="check"
            style={{ height: "50px" }}
          />
          <h3>{t("shortinfo3.item1.title")}</h3>
          <br />
          {t("shortinfo3.item1.desc")}
        </div>
        <div>
          <img
            src="/assets/svg/check-svgrepo-com.svg"
            alt="check"
            style={{ height: "50px" }}
          />
          <h3>{t("shortinfo3.item2.title")}</h3>
          <br />
          {t("shortinfo3.item2.desc")}
        </div>
        <div>
          <img
            src="/assets/svg/check-svgrepo-com.svg"
            alt="check"
            style={{ height: "50px" }}
          />
          <h3>{t("shortinfo3.item3.title")}</h3>
          <br />
          {t("shortinfo3.item3.desc")}
        </div>
        <div>
          <img
            src="/assets/svg/check-svgrepo-com.svg"
            alt="check"
            style={{ height: "50px" }}
          />
          <h3>{t("shortinfo3.item4.title")}</h3>
          <br />
          {t("shortinfo3.item4.desc")}
        </div>
      </div>
    </>
  );
}

function AllCollapseExample() {
  const { t } = useTranslation();

  return (
    <Accordion
      style={{
        width: "min(1500px, 90%)",
        padding: "clamp(0px, 5vw, 20px)",
        margin: "auto",
      }}
      flush
    >
      <Accordion.Item eventKey="0">
        <Accordion.Header>{t("accordion.item1.title")}</Accordion.Header>
        <Accordion.Body>{t("accordion.item1.body")}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("accordion.item2.title")}</Accordion.Header>
        <Accordion.Body>{t("accordion.item2.body")}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

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

function OurClients() {
  const { t } = useTranslation();
  
  return (
    <>
      <div
        style={{
          width: "min(1500px, 90%)",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h1>{t("OurClients.Clients")}</h1>
        <ImageSlider images={images} />
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <div
        className={style.view}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f8f9fa",
          fontFamily: "Roboto"
        }}
      >
        <LocationChangeModal></LocationChangeModal>
        <Navbar_v2></Navbar_v2>
        <VideoHeader></VideoHeader>
        <Shortinfo2></Shortinfo2>
        <Shortinfo3></Shortinfo3>

        <OurProjects></OurProjects>

        <HoverImage></HoverImage>
        <ParallaxImage></ParallaxImage>
        <OurTeam></OurTeam>
        <JoinUs></JoinUs>
        <Footer></Footer>
        
      </div>
    </>
  );
}

export default App;
