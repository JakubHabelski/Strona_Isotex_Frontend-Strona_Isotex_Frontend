import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbarstyle.css";
import { BsCart } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import "../../i18n";
import i18n from "i18next";
import { Button } from "react-bootstrap";
import FabricsList from "../fabrics_list/fabrics_list";
import Filling_List from "../filling_list/filling_list";
import Row from "react-bootstrap/Row";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function NavbarMain() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="/">
            <img src="/assets/logo.jpeg" alt="Logo" width="100" height="auto" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">{t("navbar.about")}</Nav.Link>
              <NavDropdown
                title={t("navbar.insulations")}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  {t("navbar.products")}
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  {t("navbar.cooperation")}
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  {t("navbar.technology")}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  {t("navbar.faq")}
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#pricing">{t("navbar.foam")}</Nav.Link>
              <Nav.Link href="#pricing">{t("navbar.blog")}</Nav.Link>
              <Nav.Link href="#pricing">{t("navbar.contact")}</Nav.Link>
              <Nav.Link onClick={() => navigate("/Sklep")}>
                {t("navbar.shop")}
              </Nav.Link>
            </Nav>
            <Nav>
              <LanguageSwitcher />
            </Nav>
            <Nav>
              <Nav.Link onClick={() => navigate(`/Sklep/koszyk`)}>
                <BsCart size={24} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="menu_wrapper">
        <ul className="product_menu">
          <li>
            <a href="/fabrics">{t("navbar.technicalFabrics")}</a>
            <div className="dropdown_item">
              <Row xs={1} md={3} className="g-2">
                <FabricsList />
              </Row>
            </div>
          </li>
          <li>
            <a href="/wypelnienia">{t("navbar.fillings")}</a>
            <div className="dropdown_item">
              <Row xs={1} md={3} className="g-2">
                <Filling_List />
              </Row>
            </div>
          </li>
          <li>
            <a href="#">{t("navbar.gaskets")}</a>
            <div className="dropdown_item"></div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavbarMain;
