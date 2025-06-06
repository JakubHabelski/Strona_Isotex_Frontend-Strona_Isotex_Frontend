import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './ProjectsGallery.module.css';
import Navbar_v2 from '../../components/Navbar_v2/Navbar';
import Footer from '../../components/Footer';
import { Modal } from 'react-bootstrap';

const ProjectsGallery = () => {
  const [modalCaption, setModalCaption] = useState('');
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  // Dynamiczne ładowanie wszystkich obrazów z folderu
  useEffect(() => {
    const importImages = () => {
      const context = require.context('../../../public/assets/gallery', false, /\.(jpg|png|webp)$/);
      const loadedImages = context.keys().map((path) => {
        const fileName = path.replace('./', '').split('.')[0]; // Pobierz nazwę pliku bez rozszerzenia
        return {
          src: context(path), // Ścieżka do obrazu
          alt: fileName, // Nazwa pliku jako alt
          caption: `Projekt: ${fileName.replace(/-/g, ' ')}`, // Generowanie podpisu na podstawie nazwy pliku
        };
      });
      setImages(loadedImages);
    };
    importImages();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(`.${style.RealizationCard}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(style.visible);
          }
        });
      },
      { threshold: 0.5 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [images]);

  const openModal = (src, caption) => {
    setModalImage(src);
    setModalCaption(caption);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalCaption('');
  };

  return (
    <>
    <Navbar_v2/>
    <div className={style.RealizationsContainer}>
      <h1>Nasze realizacje</h1>
      
      <div className={style.RealizationsGrid}>
        {images.map((image, index) => (
          
            <img src={image.src} alt={image.alt} loading="lazy"   onClick={() => handleImageClick(image.src, null)}/>
            
        ))}
      </div>
      
    </div>
    <Footer/>


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
};

export default ProjectsGallery;