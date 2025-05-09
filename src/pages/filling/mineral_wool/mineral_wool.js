import { Card, Col, Image, Row } from 'react-bootstrap'
import Footer from '../../../components/Footer'
import NavbarMain from '../../../components/Navbar/Navbar'
import '../../fabrics/glass/glass.css'
import styles from '../../Shop/Shop.module.css';
import table_styles from './mineral_wool.module.css'
import { useTranslation } from 'react-i18next';
import Navbar_v2 from '../../../components/Navbar_v2/Navbar';


function MineralWoolInfo() {
    const { t } = useTranslation(); // Hook do tłumaczeń

    return (
        <>
        <main className="Main_Glass">
        <section className="glass-fabric">
        <div className="container">
            <h2>{t('mineralWoolInfo.characteristics.title')}</h2>
            <p>{t('mineralWoolInfo.characteristics.description')}</p>
            <h3>{t('mineralWoolInfo.types.title')}</h3>
            <p>{t('mineralWoolInfo.types.description')}</p>
            <ul>
                <li>
                    <strong>{t('mineralWoolInfo.types.glassWool.title')}</strong> {t('mineralWoolInfo.types.glassWool.description')}
                </li>
                <li>
                    <strong>{t('mineralWoolInfo.types.rockWool.title')}</strong> {t('mineralWoolInfo.types.rockWool.description')}
                </li>
            </ul>
            <Card className={styles.card}>
                <Card.Img variant="top" src="/assets/materials/Fillings/welna-mineralna/welna_szklana_skalna.jpg" className="card_img_glass" style={{height: "300px"}}/>
                <Card.Body>
                <Card.Title>{t('mineralWoolInfo.comparisonCard.title')}</Card.Title>                        
                </Card.Body>
            </Card>
            <h3>{t('mineralWoolInfo.comparison.title')}</h3>
            <div className={table_styles.table_format}>
            <section className="p-4 bg-gray-50 d-none d-md-block">
                <div className="max-w-6xl mx-auto">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm md:text-base">
                        <thead className="bg-gray-100">
                            <tr>
                            <th className="p-3 border text-left font-semibold">{t('mineralWoolInfo.comparison.table.feature')}</th>
                            <th className="p-3 border text-left font-semibold">{t('mineralWoolInfo.comparison.table.glassWool')}</th>
                            <th className="p-3 border text-left font-semibold">{t('mineralWoolInfo.comparison.table.rockWool')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50">
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.thermalInsulation.feature')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.thermalInsulation.glassWool')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.thermalInsulation.rockWool')}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.compressionResistance.feature')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.compressionResistance.glassWool')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.compressionResistance.rockWool')}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.acousticInsulation.feature')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.acousticInsulation.glassWool')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.acousticInsulation.rockWool')}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.vaporPermeability.feature')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.vaporPermeability.glassWool')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.vaporPermeability.rockWool')}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.fireResistance.feature')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.fireResistance.glassWool')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.fireResistance.rockWool')}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.weight.feature')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.weight.glassWool')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.weight.rockWool')}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.moistureResistance.feature')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.moistureResistance.glassWool')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.moistureResistance.rockWool')}</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.application.feature')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.application.glassWool')}</td>
                            <td className="p-3 border">{t('mineralWoolInfo.comparison.table.application.rockWool')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </section>
            </div>
            
            <section className="p-4 bg-gray-50 d-md-none">
                <div className="max-w-6xl mx-auto space-y-4">
                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h4 className="fw-bold mb-2">{t('mineralWoolInfo.comparison.mobile.thermalInsulation.feature')}</h4>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.thermalInsulation.glassWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.thermalInsulation.glassWool')}</p>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.thermalInsulation.rockWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.thermalInsulation.rockWool')}</p>
                    </div>
                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h4 className="fw-bold mb-2">{t('mineralWoolInfo.comparison.mobile.compressionResistance.feature')}</h4>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.compressionResistance.glassWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.compressionResistance.glassWool')}</p>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.compressionResistance.rockWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.compressionResistance.rockWool')}</p>
                    </div>
                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h4 className="fw-bold mb-2">{t('mineralWoolInfo.comparison.mobile.acousticInsulation.feature')}</h4>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.acousticInsulation.glassWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.acousticInsulation.glassWool')}</p>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.acousticInsulation.rockWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.acousticInsulation.rockWool')}</p>
                    </div>
                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h4 className="fw-bold mb-2">{t('mineralWoolInfo.comparison.mobile.vaporPermeability.feature')}</h4>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.vaporPermeability.glassWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.vaporPermeability.glassWool')}</p>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.vaporPermeability.rockWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.vaporPermeability.rockWool')}</p>
                    </div>
                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h4 className="fw-bold mb-2">{t('mineralWoolInfo.comparison.mobile.fireResistance.feature')}</h4>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.fireResistance.glassWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.fireResistance.glassWool')}</p>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.fireResistance.rockWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.fireResistance.rockWool')}</p>
                    </div>
                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h4 className="fw-bold mb-2">{t('mineralWoolInfo.comparison.mobile.weight.feature')}</h4>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.weight.glassWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.weight.glassWool')}</p>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.weight.rockWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.weight.rockWool')}</p>
                    </div>
                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h4 className="fw-bold mb-2">{t('mineralWoolInfo.comparison.mobile.moistureResistance.feature')}</h4>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.moistureResistance.glassWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.moistureResistance.glassWool')}</p>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.moistureResistance.rockWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.moistureResistance.rockWool')}</p>
                    </div>
                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h4 className="fw-bold mb-2">{t('mineralWoolInfo.comparison.mobile.application.feature')}</h4>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.application.glassWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.application.glassWool')}</p>
                        <p><strong>{t('mineralWoolInfo.comparison.mobile.application.rockWoolTitle')}</strong> {t('mineralWoolInfo.comparison.mobile.application.rockWool')}</p>
                    </div>
                </div>
            </section>


            <h3>{t('mineralWoolInfo.production.title')}</h3>
            <p>{t('mineralWoolInfo.production.description')}</p>
            <h3>{t('mineralWoolInfo.coatings.title')}</h3>
            <p>{t('mineralWoolInfo.coatings.description')}</p>
            <ul style={{display: 'flex', flexDirection: 'column'}}>
                <li>
                    <strong>{t('mineralWoolInfo.coatings.aluminum.title')}</strong> {t('mineralWoolInfo.coatings.aluminum.description')}
                </li>
                <li>
                    <strong>{t('mineralWoolInfo.coatings.glassFiber.title')}</strong> {t('mineralWoolInfo.coatings.glassFiber.description')}
                </li>
            </ul>
            <Row xs={1} md={2} className="g-4">
                    <Col>
                    <Card className={styles.card}>
                        <Card.Img variant="top" src="/assets/materials/Fillings/welna-mineralna/welna_mineralna_aluminium.jpg" className="card_img_glass" style={{height: "300px", objectFit: "contain"}}/>
                        <Card.Body>
                        <Card.Title>{t('mineralWoolInfo.coatings.aluminumCard.title')}</Card.Title>                        
                        </Card.Body>
                    </Card>
                    </Col> 
                    <Col>
                    <Card className={styles.card}>
                        <Card.Img variant="top" src="/assets/materials/Fillings/welna-mineralna/welna_szklana.jpg" className="card_img_glass" style={{height: "300px"}}/>
                        <Card.Body>
                        <Card.Title>{t('mineralWoolInfo.coatings.glassFiberCard.title')}</Card.Title>                        
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>

            <h3>{t('mineralWoolInfo.properties.title')}</h3>
            <p>{t('mineralWoolInfo.properties.description')}</p>
            <ul>
                <li>
                    <strong>{t('mineralWoolInfo.properties.highTemperature.title')}</strong> {t('mineralWoolInfo.properties.highTemperature.description')}
                </li>
                <li>
                    <strong>{t('mineralWoolInfo.properties.thermalInsulation.title')}</strong> {t('mineralWoolInfo.properties.thermalInsulation.description')}
                </li>
                <li>
                    <strong>{t('mineralWoolInfo.properties.acousticInsulation.title')}</strong> {t('mineralWoolInfo.properties.acousticInsulation.description')}
                </li>
                <li>
                    <strong>{t('mineralWoolInfo.properties.chemicalResistance.title')}</strong> {t('mineralWoolInfo.properties.chemicalResistance.description')}
                </li>
            </ul>
            <Row xs={2} sm={3} md={4}>
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/fabrics/glass/termometr.jpg" className="card_img_glass" roundedCircle />
                    </Col>
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/Fillings/welna-mineralna/izolacyjnosc-termiczna.jpg" className="card_img_glass" />
                    </Col>
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/Fillings/welna-mineralna/Izolacyjność-akustyczna.jpg" className="card_img_glass" />
                    </Col>
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/fabrics/glass/chemia.jpg" className="card_img_glass" roundedCircle />
                    </Col> 
                </Row>
            <h3>{t('mineralWoolInfo.applications.title')}</h3>
            <p>{t('mineralWoolInfo.applications.description')}</p>
            <ul>
                <li>
                    <strong>{t('mineralWoolInfo.applications.buildingInsulation.title')}</strong> {t('mineralWoolInfo.applications.buildingInsulation.description')}
                </li>
                <li>
                    <strong>{t('mineralWoolInfo.applications.industrialInsulation.title')}</strong> {t('mineralWoolInfo.applications.industrialInsulation.description')}
                </li>
                <li>
                    <strong>{t('mineralWoolInfo.applications.acousticInsulation.title')}</strong> {t('mineralWoolInfo.applications.acousticInsulation.description')}
                </li>
                <li>
                    <strong>{t('mineralWoolInfo.applications.fireProtection.title')}</strong> {t('mineralWoolInfo.applications.fireProtection.description')}
                </li>
            </ul>
            <h3>{t('mineralWoolInfo.summary.title')}</h3>
            <p>{t('mineralWoolInfo.summary.description')}</p>
        </div>
        </section>    
        </main>
        </>
    )
}

export default function MineralWool() {
    return (
        <>
        <Navbar_v2></Navbar_v2>
        <MineralWoolInfo/>
        <Footer/>
        </>
    )
}