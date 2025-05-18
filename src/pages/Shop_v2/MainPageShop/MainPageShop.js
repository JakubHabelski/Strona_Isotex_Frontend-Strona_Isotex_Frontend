import Navbar from "../../../components/Navbar_v2/Navbar";
import Footer from '../../../components/Footer';
import { Col, Container, Image, Row } from "react-bootstrap";
import style from './MainPageShop.module.css';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import ControlledCarousel from "../../../components/Carousel/Carousel";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";

function MainPageShopMain() {
  const [showLists, setShowLists] = useState({
    fabrics: false,
    fillings: false,
    services: false,
  });
  const listRefs = useRef({});
  const navigate = useNavigate();
  const { t } = useTranslation();

  const categories = [
    {
      key: 'fabrics',
      icon: '/assets/fabric.png',
      label: t('MainPageShop.LeftBar.Category.Fabrics'),
      arrowId: 'fabricArrow',
      subcategories: ['glassFabric', 'aramidFabric'],
    },
    {
      key: 'fillings',
      icon: '/assets/icons/wool-fabric.png',
      label: t('MainPageShop.LeftBar.Category.Fillings'),
      arrowId: 'fillingArrow',
      subcategories: ['mineralWool', 'ceramicWool', 'glassMat'],
    },
    {
      key: 'services',
      icon: '/assets/icons/services.png',
      label: t('MainPageShop.LeftBar.Category.Services'),
      arrowId: 'servicesArrow',
      subcategories: ['measurement', 'project', 'mattressProduction', 'installation'],
    },
  ];

  const toggleList = (key, arrowId) => {
    setShowLists((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      const arrow = document.getElementById(arrowId);
      if (arrow) {
        arrow.style.transition = 'transform 0.3s';
        arrow.style.transform = newState[key] ? 'rotate(90deg)' : 'rotate(0deg)';
      }
      return newState;
    });
  };

  useEffect(() => {
    Object.keys(listRefs.current).forEach((key) => {
      const ref = listRefs.current[key];
      if (ref) {
        ref.style.maxHeight = showLists[key] ? `${ref.scrollHeight}px` : '0';
      }
    });
  }, [showLists]);

  return (
    <Row>
      <Col xs={12} md={2}>
        {categories.map((category) => (
          <div key={category.key} className={style.MainPageShopLinks}>
            <div
              style={{ cursor: 'pointer' }}
              className={style.MainCategory}
              onClick={() => toggleList(category.key, category.arrowId)}
            >
              <Image src={category.icon} alt={category.label} width={32} height={32} />
              <h3>{category.label}</h3>
              <Image
                src="/assets/icons/right-arrow.png"
                id={category.arrowId}
                alt="Arrow"
                width={32}
                height={32}
              />
            </div>
            <div
              ref={(el) => (listRefs.current[category.key] = el)}
              className={`${style.subcategorylist} ${showLists[category.key] ? style.open : ''}`}
            >
              {category.subcategories.map((subcategory) => (
                <div key={subcategory} className={style.listitem}>
                  <div className={style.bar}></div>
                  <p>{t(`MainPageShop.LeftBar.${category.key}.${subcategory}`)}</p>
                  <Image src="/assets/icons/right-arrow.png" alt="Arrow" width={32} height={32} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Col>
      <Col xs={12} md={10}>
      <div style={{ width: '100%', padding: '20px' }}>
        <ImageCarousel></ImageCarousel>
      </div>
        
      </Col>
    </Row>
  );
}

export default function MainPageShop() {
  return (
    <>
      <Navbar />
      <MainPageShopMain />
      <Footer />
    </>
  );
}