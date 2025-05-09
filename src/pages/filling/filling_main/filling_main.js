import { Card, Row } from "react-bootstrap"
import Footer from "../../../components/Footer"
import NavbarMain from "../../../components/Navbar/Navbar"
import style from "./filling_main.module.css"
import { useTranslation } from 'react-i18next'; // Importujemy hook i18n
import Filling_List from "../../../components/filling_list/filling_list"
import FabricsList from "../../../components/fabrics_list/fabrics_list"
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";

function redirectToPage(page) {
    window.location.href = page; // względna ścieżka w Twojej aplikacji
}

function Filling_Info() {
    const { t } = useTranslation(); // Używamy hooka do tłumaczeń

    return (
        <>
            <Card className={`bg-dark text-white ${style.card_extra}`}>
                <Card.Img src="/assets/materials/Fillings/IMG_2112.jpg" alt="Card image" className={`${style.card_img_extra}`} />
                <Card.ImgOverlay className={style.card_img_overlay_extra}>
                    <h1 className={style.card_title_extra}>{t('fillingInfo.title')}</h1>
                </Card.ImgOverlay>
            </Card>
            <section className="py-5 px-3 bg-light">
                <div className={`container ${style.container_extra}`}>
                    <p className="lead text-center">
                        {t('fillingInfo.description')}
                    </p>
                    <h3>{t('fillingInfo.mainFunctions')}</h3>
                    <ul>
                        <li>
                            <strong>{t('fillingInfo.thermalInsulation')}</strong> {t('fillingInfo.thermalInsulationDesc')}
                        </li>
                        <li>
                            <strong>{t('fillingInfo.highTemperatureProtection')}</strong> {t('fillingInfo.highTemperatureProtectionDesc')}
                        </li>
                        <li>
                            <strong>{t('fillingInfo.fireSafety')}</strong> {t('fillingInfo.fireSafetyDesc')}
                        </li>
                        <li>
                            <strong>{t('fillingInfo.chemicalMechanicalResistance')}</strong> {t('fillingInfo.chemicalMechanicalResistanceDesc')}
                        </li>
                        <li>
                            <strong>{t('fillingInfo.flexibility')}</strong> {t('fillingInfo.flexibilityDesc')}
                        </li>
                    </ul>
                    <h3>{t('fillingInfo.mainTypes')}</h3>
                    
                        <Row xs={1} md={3} className={`${style.card_list} g-2`}  >
                            <Card className={style.card_element} onClick={() => redirectToPage('/wypelnienia/welna-mineralna')}>
                                <Card.Img variant="top" src="/assets/materials/Fillings/welna-mineralna.jpg" className="card_img" />
                                <Card.Body>
                                    <Card.Title>{t('fillingInfo.mineralWools')}</Card.Title>
                                    <Card.Text>
                                        {t('fillingInfo.mineralWoolsDesc')}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className={style.card_element} onClick={() => redirectToPage('/wypelnienia/welna-ceramiczna')}>
                                <Card.Img variant="top" src="/assets/materials/Fillings/welna-ceramiczna.jpg" className="card_img" />
                                <Card.Body>
                                    <Card.Title>{t('fillingInfo.ceramicWools')}</Card.Title>
                                    <Card.Text>
                                        {t('fillingInfo.ceramicWoolsDesc')}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className={style.card_element} onClick={() => redirectToPage('/wypelnienia/mata-szklana')}>
                                <Card.Img variant="top" src="/assets/materials/Fillings/mata-szklana.jpg" className="card_img" />
                                <Card.Body>
                                    <Card.Title>{t('fillingInfo.glassMats')}</Card.Title>
                                    <Card.Text>
                                        {t('fillingInfo.glassMatsDesc')}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    
                </div>
            </section>
        </>
    )
}

export default function Filling() {
    return (
        <>
            <Navbar_v2></Navbar_v2>
            <Filling_Info />
            <Footer />
        </>
    )
}
