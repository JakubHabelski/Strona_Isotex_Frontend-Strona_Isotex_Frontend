import { useEffect, useRef, useState } from "react";
import style from "./OurProjects.module.css";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function OurProjects() {
  const turbineRef = useRef(null);
  const valvesRef = useRef(null);
  const exchangerRef = useRef(null);
  const productionRef = useRef(null);

  const turbineBtnRef = useRef(null);
  const valvesBtnRef = useRef(null);
  const exchangerBtnRef = useRef(null);
  const productionBtnRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const navigate = useNavigate();

  const { t } = useTranslation();

    const handleImageClick = (imageUrl, title) => {
    setModalImage(imageUrl);
    setModalTitle(title);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage("");
    setModalTitle("");
  };

  const tabs = [turbineRef, valvesRef, exchangerRef, productionRef];
  const buttons = [
    turbineBtnRef,
    valvesBtnRef,
    exchangerBtnRef,
    productionBtnRef,
  ];

  const projects = [
    {
      id: "turbine",
      ref: turbineRef,
      buttonRef: turbineBtnRef,
      buttonText: t("OurProjects.buttons.turbines"),
      
      images: [
        {
          src: "assets/OurProjects/Turbine/TurbinaParowa/Obraz 147.jpg",
          alt: "Turbina",
          title: "Turbina parowa",
          description: "Tu znajdziesz więcej informacji o turbinach.",
        },
        {
          src: "assets/OurProjects/Turbine/TurbinaParowa/Obraz 148.jpg",
          alt: "Turbina",
          title: "Turbina parowa",
          description: "Tu znajdziesz więcej informacji o turbinach.",
        },
        {
          src: "assets/OurProjects/Turbine/TurbinaParowa/Obraz 149.jpg",
          alt: "Turbina",
          title: "Turbina parowa",
          description: "Tu znajdziesz więcej informacji o turbinach.",
        }
        
      ],
    },
    {
      id: "valves",
      ref: valvesRef,
      buttonRef: valvesBtnRef,
      buttonText: t("OurProjects.buttons.valves"),
      images: [
        {
          src: "assets/OurProjects/Valves/20161117_095830.jpg",
          alt: "Zawór",
          title: "Zawór",
          description: "Tu znajdziesz więcej informacji o zaworach.",
        },
        {
          src: "assets/OurProjects/Valves/1.jpeg",
          alt: "Zawór",
          title: "Zawór",
          description: "Tu znajdziesz więcej informacji o zaworach.",
        },
        {
          src: "assets/OurProjects/Valves/2.jpeg",
          alt: "Zawór",
          title: "Zawór",
          description: "Tu znajdziesz więcej informacji o zaworach.",
        },
        {
          src: "assets/OurProjects/Valves/3.jpeg",
          alt: "Zawór",
          title: "Zawór",
          description: "Tu znajdziesz więcej informacji o zaworach.",
        },
        {
          src: "assets/OurProjects/Valves/4.jpeg",
          alt: "Zawór",
          title: "Zawór",
          description: "Tu znajdziesz więcej informacji o zaworach.",
        },
      ],
    },
    {
      id: "exchanger",
      ref: exchangerRef,
      buttonRef: exchangerBtnRef,
      buttonText: t("OurProjects.buttons.exchangers"),
      images: [
        {
          src: "assets/OurProjects/Exchanger/1.jpeg",
          alt: "Wymiennik",
          title: "Wymiennik",
          description: "Tu znajdziesz więcej informacji o wymiennikach.",
        },
        {
          src: "assets/OurProjects/Exchanger/2.jpeg",
          alt: "Wymiennik",
          title: "Wymiennik",
          description: "Tu znajdziesz więcej informacji o wymiennikach.",
        },
        {
          src: "assets/OurProjects/Exchanger/3.jpeg",
          alt: "Wymiennik",
          title: "Wymiennik",
          description: "Tu znajdziesz więcej informacji o wymiennikach.",
        },
        {
          src: "assets/OurProjects/Exchanger/4.jpeg",
          alt: "Wymiennik",
          title: "Wymiennik",
          description: "Tu znajdziesz więcej informacji o wymiennikach.",
        },
        {
          src: "assets/OurProjects/Exchanger/5.jpeg",
          alt: "Wymiennik",
          title: "Wymiennik",
          description: "Tu znajdziesz więcej informacji o wymiennikach.",
        },
      ],
    },
    {
      id: "production",
      ref: productionRef,
      buttonRef: productionBtnRef,
      buttonText: t("OurProjects.buttons.production"),
      images: [
        {
          src: "assets/OurProjects/Production/1.jpg",
          alt: "Produkcja",
          title: "Produkcja",
          description: "Tu znajdziesz więcej informacji o produkcji.",
        },
        {
          src: "assets/OurProjects/Production/2.jpg",
          alt: "Produkcja",
          title: "Produkcja",
          description: "Tu znajdziesz więcej informacji o produkcji.",
        },
        {
          src: "assets/OurProjects/Production/3.jpg",
          alt: "Produkcja",
          title: "Produkcja",
          description: "Tu znajdziesz więcej informacji o produkcji.",
        },
        {
          src: "assets/OurProjects/Production/4.jpg",
          alt: "Produkcja",
          title: "Produkcja",
          description: "Tu znajdziesz więcej informacji o produkcji.",
        },
        {
          src: "assets/OurProjects/Production/5.jpg",
          alt: "Produkcja",
          title: "Produkcja",
          description: "Tu znajdziesz więcej informacji o produkcji.",
        },
      ],
    },
  ];

  useEffect(() => {
    const turbineElement = document.getElementById("turbine");
    if (turbineElement) {
      turbineElement.style.display = "grid";
    }
  }, []);

  function setKey(key) {
    console.log(key);

    tabs.forEach((tab) => {
      if (tab.current && tab.current.id === key) {
        tab.current.style.display = "grid";
        tab.current.style.opacity = "0";
        tab.current.style.scale = "1";
        setTimeout(() => {
          tab.current.style.scale = "1";
          tab.current.style.opacity = "1";
          tab.current.style.transition = "opacity 1s ease-in-out";
        }, 0);
      } else if (tab.current) {
        tab.current.style.display = "none";
      }
    });

    buttons.forEach((button) => {
      if (button.current && button.current.id === key + "_btn") {
        button.current.classList.add("active");
      } else if (button.current) {
        button.current.classList.remove("active");
      }
    });
  }

  return (
    <>
      <div className={style.ourProjectsContainer}>
        <h1>{t('OurProjects.title')}</h1>
        <div className={style.buttonContainer}>
          {projects.map((project) => (
            <button
              key={project.id}
              className={`${style.button} btn btn-outline-danger`}
              id={`${project.id}_btn`}
              ref={project.buttonRef}
              onClick={() => setKey(project.id)}
            >
              {project.buttonText}
            </button>
          ))}
        </div>
        <div className={style.tabContainer}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={style.tab}
              id={project.id}
              ref={project.ref}
            >
              {project.images.map((image, index) => (
                <div key={index} className={style.tabContent}>
                  <img
                    className={style.tabImg}
                    src={image.src}
                    alt={image.alt}
                    onClick={() => handleImageClick(image.src, image.src)}
                  />
                  {/*
                  <div className={style.tabOverlay}>
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                  </div>
                  */}
                </div>
              ))}
            </div>
          ))}
        </div>
        <Button 
          variant="outline-danger"
          style={{margin:"50px auto", width:"100%"}}
          onClick={() => navigate('/ProjectsGallery')}
          >
          Kliknij aby zobaczyć naszą galerię
        </Button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered size="xl" className={style.modal_custom}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalImage} alt="Product" className={style.modal_custom_img} />
        </Modal.Body>
      </Modal>
    </>
  );
}
