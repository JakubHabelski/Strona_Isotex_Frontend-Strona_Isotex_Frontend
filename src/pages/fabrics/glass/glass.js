import { Card, Col, Image, Row } from "react-bootstrap";
import Footer from "../../../components/Footer";
import NavbarMain from "../../../components/Navbar/Navbar";
import styles from '../../Shop/Shop.module.css';
import { useTranslation } from 'react-i18next'; // Import i18n
import './glass.css';
import Navbar_v2 from "../../../components/Navbar_v2/Navbar";

function Glass_Info() {
    const { t } = useTranslation(); // Hook do tłumaczenia

    return(
        <>
            <main className="Main_Glass">
            <section className="glass-fabric">
            <div className="container">
                <h2>{t('glass_info.generalCharacteristics')}</h2> {/* Tłumaczenie tytułu */}
                <p>{t('glass_info.generalDescription')}</p> {/* Tłumaczenie opisu */}

                <h3>{t('glass_info.typesOfFibers')}</h3> {/* Tłumaczenie nagłówka */}
                <ul>
                    <li><strong>{t('glass_info.eGlassFiber')}</strong>: {t('glass_info.eGlassFiberDescription')}</li>
                    <li><strong>{t('glass_info.texturedAndSmoothFibers')}</strong>: 
                        <ol>
                        <li><strong>{t('glass_info.filamentFibers')}</strong> – {t('glass_info.filamentFibersDescription')}</li>
                        <li><strong>{t('glass_info.texturedFibers')}</strong> – {t('glass_info.texturedFibersDescription')}</li>
                        </ol>
                    </li>
                </ul>

                <h3>{t('glass_info.productionProcess')}</h3> {/* Tłumaczenie nagłówka */}
                <p>{t('glass_info.productionProcessDescription')}</p> {/* Tłumaczenie opisu */}

                <h3>{t('glass_info.coatings')}</h3> {/* Tłumaczenie nagłówka */}
                <p>{t('glass_info.coatingsDescription')}</p> {/* Tłumaczenie opisu */}
                <ul>
                    <li><strong>{t('glass_info.siliconeCoating')}</strong>: {t('glass_info.siliconeCoatingDescription')}</li>
                    <li><strong>{t('glass_info.vermiculiteCoating')}</strong>: {t('glass_info.vermiculiteCoatingDescription')}</li>
                    <li><strong>{t('glass_info.aluminumCoating')}</strong>: {t('glass_info.aluminumCoatingDescription')}</li>
                </ul>
                
                {/* Wstawienie obrazków z opisami */}
                <Row xs={1} md={4} className="g-4">
                    <Col>
                        <Card className={styles.card}>
                            <Card.Img variant="top" src="/assets/materials/fabrics/glass/Tkanina_pokryta żółtym_silikonem.jpg" className="card_img_glass" />
                            <Card.Body>
                                <Card.Title>{t('glass_info.yellowSiliconeCoating')}</Card.Title> {/* Tłumaczenie tytułu */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles.card}>
                            <Card.Img variant="top" src="/assets/materials/fabrics/glass/Silikon_szary.jpg" className="card_img_glass" />
                            <Card.Body>
                                <Card.Title>{t('glass_info.graySiliconeCoating')}</Card.Title> {/* Tłumaczenie tytułu */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles.card}>
                            <Card.Img variant="top" src="/assets/materials/fabrics/glass/aluminized-fabric-egla-200-al.jpg" className="card_img_glass" />
                            <Card.Body>
                                <Card.Title>{t('glass_info.aluminumCoating')}</Card.Title> {/* Tłumaczenie tytułu */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles.card}>
                            <Card.Img variant="top" src="/assets/materials/fabrics/glass/wermikulit.jpg" className="card_img_glass" />
                            <Card.Body>
                                <Card.Title>{t('glass_info.vermiculiteCoating')}</Card.Title> {/* Tłumaczenie tytułu */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <h3>{t('glass_info.properties')}</h3> {/* Tłumaczenie nagłówka */}
                <ul>
                    <li><strong>{t('glass_info.temperatureResistance')}</strong>: {t('glass_info.temperatureResistanceDescription')}</li>
                    <li><strong>{t('glass_info.chemicalResistance')}</strong>: {t('glass_info.chemicalResistanceDescription')}</li>
                    <li><strong>{t('glass_info.flexibilityAndStrength')}</strong>: {t('glass_info.flexibilityAndStrengthDescription')}</li>
                </ul>

                <Row xs={1} md={3} >
                    
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/fabrics/glass/termometr.jpg" className="card_img_glass" roundedCircle />
                    </Col>
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/fabrics/glass/chemia.jpg" className="card_img_glass" roundedCircle />
                    </Col> 
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/fabrics/glass/elastyczność.jpg" className="card_img_glass" roundedCircle />
                    </Col>  
                    
                </Row>
                <h3>{t('glass_info.application')}</h3> {/* Tłumaczenie nagłówka */}
                <p>{t('glass_info.applicationDescription')}</p> {/* Tłumaczenie opisu */}
                <ul>
                    <li><strong>{t('glass_info.thermalInsulation')}</strong>: {t('glass_info.thermalInsulationDescription')}</li>
                    <li><strong>{t('glass_info.metalurgicalEnergyIndustry')}</strong>: {t('glass_info.metalurgicalEnergyIndustryDescription')}</li>
                    <li><strong>{t('glass_info.fireProtection')}</strong>: {t('glass_info.fireProtectionDescription')}</li>
                </ul>
                
                <p><strong>{t('glass_info.summary')}</strong>: {t('glass_info.summaryDescription')}</p> {/* Tłumaczenie podsumowania */}
            </div>
            </section>
            </main>
        </>
    )
}

export default function Glass(){
    return(
        <>
        <Navbar_v2></Navbar_v2>
        <Glass_Info></Glass_Info>
        <Footer></Footer>
        </>
    )
}
