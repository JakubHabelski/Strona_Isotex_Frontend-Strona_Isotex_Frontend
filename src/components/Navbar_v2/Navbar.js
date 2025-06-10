import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "./Navbar.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { BsCart } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";




export default function Navbar_v2() {

  const social_media_ref = useRef(null);
  const navbar = useRef(null);

  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!navbar.current || !social_media_ref.current) return;
      /*
      if (currentScroll < window.scrollY) {
        navbar.current.style.transform = `translateY(-${social_media_ref.current.offsetHeight}px)`;
      } else {
        navbar.current.style.transform = `translateY(0px)`;
      }
      setCurrentScroll(window.scrollY);
      */
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentScroll]);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuData = [
    { path: "/", name: "Home" },
    {
      name: t("navbar.about"),
      dropdown: [
        { path: "/AboutUs", name: t("navbar.about") },
        { path: "/AboutUs/Technology", name: t("navbar.technology") },
      ]
    },
    { path: "/fabrics", name: t("navbar.technicalFabrics") },
    { path: "/wypelnienia", name: t("navbar.fillings") },
    { path: "/kontakt", name: t("navbar.contact") },
    { path: "/MainPageShop", name: t("navbar.shop") },
  ];

  return (
    <>
    <div className={styles.navbar_background} ref={navbar}>
     <div className={`${styles.social_media} `} ref={social_media_ref}>
        <a href="https://www.facebook.com/P.P.U.H.Isotex/" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-facebook"></ion-icon></a>
        <a href="https://www.instagram.com/isotex_insulation_matters/" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-instagram"></ion-icon></a>
        <a href="https://pl.linkedin.com/in/isotex-group-128758264" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-linkedin"></ion-icon></a>
        <a href="https://www.youtube.com/watch?v=DaNj3DzocqQ" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-youtube"></ion-icon></a>
        <a href="tel:+48600511029" target="_blank" rel="noopener noreferrer" className={styles.social_media_text}><ion-icon name="call-outline" ></ion-icon> +48 600 511 029</a>
        <LanguageSwitcher />
     </div>
    <Navbar expand="lg" className={styles.Navbar_v2}>
      <Container>
        <Navbar.Brand href="/" className={styles.Brand}>
        <img src="/assets/logo_black.png" alt="Logo" width="auto" height="100px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.Navbar_Collapse}>
          <Nav className={`${styles.navCentered} ms-auto`}>
            <Nav.Link href="/">
          <div className={styles.list_item}>{t("Home")}</div>
        </Nav.Link>
        <NavDropdown
          title={
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/AboutUs")}>
              {t("navbar.about")}
            </span>
          }
          id="nav-dropdown-about"
        >
          <NavDropdown.Item href="/AboutUs" style={{fontWeight: "800"}}>
            {t("navbar.about")}
          </NavDropdown.Item>
          <NavDropdown.Item href="/AboutUs/Technology" style={{fontWeight: "800"}}>
            {t("navbar.technology")}
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/fabrics">
          <div className={styles.list_item}>{t("navbar.technicalFabrics")}</div>
        </Nav.Link>
        <Nav.Link href="/wypelnienia">
          <div className={styles.list_item}>{t("navbar.fillings")}</div>
        </Nav.Link>
        <Nav.Link href="/kontakt">
          <div className={styles.list_item}>{t("navbar.contact")}</div>
        </Nav.Link>
        <Nav.Link href="/MainPageShop">
          <div className={styles.list_item}>{t("navbar.shop")}</div>
        </Nav.Link>
            </Nav>
            <Nav.Link onClick={() => navigate(`/Sklep/koszyk`)}>
                            <BsCart size={24} />
            </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    </>
  );
}
