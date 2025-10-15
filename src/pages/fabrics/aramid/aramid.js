import { Card, Col, Image, Row } from 'react-bootstrap';
import Footer from '../../../components/Footer';
import NavbarMain from '../../../components/Navbar/Navbar';
import '../glass/glass.css';
import styles from '../../Shop/Shop.module.css';
import { useTranslation } from 'react-i18next';
import Navbar_v2 from '../../../components/Navbar_v2/Navbar';
import { Helmet } from 'react-helmet';
import { baseURL, logoURL, faviconURL } from '../../../config';

function Aramid_Info() {
    const { t } = useTranslation(); // Hook do tłumaczenia
    return (
        <>
            <Helmet>
                <title>{t('page_titles.fabrics.aramid_fabrics')}</title>
                <meta name="description" content={t('fabrics_info.aramid_fabrics.meta.description')} />
                <meta name="keywords" content={t('fabrics_info.aramid_fabrics.meta.keywords')} />
                <meta name="robots" content="index, follow" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={t('page_titles.fabrics.aramid_fabrics')} />
                <meta name="twitter:description" content={t('fabrics_info.aramid_fabrics.meta.description')} />
                <meta name="twitter:image" content={logoURL} />
                <meta property="og:title" content={t('page_titles.fabrics.aramid_fabrics')} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={logoURL} />
                <meta property="og:url" content={`${baseURL}/tkaniny/aramidowe`} />
                <meta property="og:description" content={t('fabrics_info.aramid_fabrics.meta.description')} />
                <meta property="og:site_name" content="Isotex Group Ilona Żurawa" />
                <link rel="canonical" href={`${baseURL}/tkaniny/aramidowe`} />
                <link rel="icon" type="image/png" href={faviconURL} />
                <script type="application/ld+json">{`
                {
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "${t('page_titles.fabrics.aramid_fabrics')}",
                    "description": "${t('fabrics_info.aramid_fabrics.meta.description')}",
                    "url": "${baseURL}/tkaniny/aramidowe",
                    "publisher": {
                    "@type": "Organization",
                    "name": "Isotex Group",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "${logoURL}"
                    },
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Syców",
                        "addressCountry": "PL"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "contactType": "customer service",
                        "email": "kontakt@isotex-poland.com",
                        "url": "${baseURL}/kontakt"
                    }
                    }
                }
                `}</script>
            </Helmet>
            <main className="Main_Glass">
                <section className="glass-fabric">
                    <div className="container">
                        <h2>{t('aramid_info.generalCharacteristics')}</h2> {/* Tłumaczenie nagłówka */}
                        <p>{t('aramid_info.generalDescription')}</p> {/* Tłumaczenie opisu */}
                        <h3>{t('aramid_info.aramidTypes')}</h3> {/* Tłumaczenie podnagłówka */}
                        <ul>
                            <li>
                                <strong>{t('aramid_info.kevlar')}</strong>: {t('aramid_info.kevlarDescription')}
                            </li>
                            <li>
                                <strong>{t('aramid_info.twaron')}</strong>: {t('aramid_info.twaronDescription')}
                            </li>
                        </ul>
                        <h3>{t('aramid_info.productionProcess')}</h3> {/* Tłumaczenie nagłówka */}
                        <p>{t('aramid_info.productionProcessDescription')}</p> {/* Tłumaczenie opisu */}
                        <h3>{t('aramid_info.coatingsAndModifications')}</h3> {/* Tłumaczenie nagłówka */}
                        <ul style={{ display: 'flex', flexDirection: 'column' }}>
                            <li>
                                <strong>{t('aramid_info.silicone')}</strong>: {t('aramid_info.siliconeDescription')}
                            </li>
                            <li>
                                <strong>{t('aramid_info.aluminum')}</strong>: {t('aramid_info.aluminumDescription')}
                            </li>
                        </ul>
                        <Row xs={1} md={2} className="g-4">
                            <Col>
                                <Card className={styles.card}>
                                    <Card.Img variant="top" src="/assets/materials/fabrics/Aramid/aramid-silikon.jpg" className="card_img_glass" style={{ height: "300px" }} />
                                    <Card.Body>
                                        <Card.Title>{t('aramid_info.siliconeCoatedAramid')}</Card.Title> {/* Tłumaczenie tytułu */}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className={styles.card}>
                                    <Card.Img variant="top" src="/assets/materials/fabrics/Aramid/aramid-aluminium.jpg" className="card_img_glass" style={{ height: "300px" }} />
                                    <Card.Body>
                                        <Card.Title>{t('aramid_info.aluminumCoatedAramid')}</Card.Title> {/* Tłumaczenie tytułu */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <h3>{t('aramid_info.properties')}</h3> {/* Tłumaczenie nagłówka */}
                        <ul style={{ display: 'flex', flexDirection: 'column' }}>
                            <li>
                                <strong>{t('aramid_info.thermalResistance')}</strong>: {t('aramid_info.thermalResistanceDescription')}
                            </li>
                            <li>
                                <strong>{t('aramid_info.mechanicalResistance')}</strong>: {t('aramid_info.mechanicalResistanceDescription')}
                            </li>
                            <li>
                                <strong>{t('aramid_info.chemicalResistance')}</strong>: {t('aramid_info.chemicalResistanceDescription')}
                            </li>
                            <li>
                                <strong>{t('aramid_info.lowWeight')}</strong>: {t('aramid_info.lowWeightDescription')}
                            </li>
                        </ul>
                        <Row xs={1} md={4}>
                            <Col style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src="/assets/materials/fabrics/glass/termometr.jpg" className="card_img_glass" />
                            </Col>
                            <Col style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src="/assets/materials/fabrics/elomelo.jpg" className="card_img_glass" />
                            </Col>
                            <Col style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src="/assets/materials/fabrics/glass/chemia.jpg" className="card_img_glass" />
                            </Col>
                            <Col style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src="/assets/materials/fabrics/Aramid/masa.jpg" className="card_img_glass" />
                            </Col>
                        </Row>
                        <h3>{t('aramid_info.applications')}</h3> {/* Tłumaczenie nagłówka */}
                        <ul style={{ display: 'flex', flexDirection: 'column' }}>
                            <li>
                                <strong>{t('aramid_info.defenseAndRescue')}</strong>: {t('aramid_info.defenseAndRescueDescription')}
                            </li>
                            <li>
                                <strong>{t('aramid_info.thermalAndFireProtection')}</strong>: {t('aramid_info.thermalAndFireProtectionDescription')}
                            </li>
                            <li>
                                <strong>{t('aramid_info.automotiveAndAviation')}</strong>: {t('aramid_info.automotiveAndAviationDescription')}
                            </li>
                            <li>
                                <strong>{t('aramid_info.industrialInsulation')}</strong>: {t('aramid_info.industrialInsulationDescription')}
                            </li>
                        </ul>
                        <Row xs={1} md={3}>
                            <Col style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src="/assets/materials/fabrics/Aramid/kamizelka.jpg" className="card_img_glass" />
                            </Col>
                            <Col style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src="/assets/materials/fabrics/Aramid/rekawice.jpg" className="card_img_glass" />
                            </Col>
                            <Col style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src="/assets/materials/fabrics/Aramid/samolot.jpg" className="card_img_glass" />
                            </Col>
                        </Row>
                        <h3>{t('aramid_info.summary')}</h3> {/* Tłumaczenie nagłówka */}
                        <p>{t('aramid_info.summaryDescription')}</p> {/* Tłumaczenie podsumowania */}
                    </div>
                </section>
            </main>
        </>
    );
}

export default function Aramid() {
    return (
        <>
            <Navbar_v2></Navbar_v2>
            <Aramid_Info />
            <Footer />
        </>
    );
}
