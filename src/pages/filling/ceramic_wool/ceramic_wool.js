import { Card, Col, Image, Row } from 'react-bootstrap'
import Footer from '../../../components/Footer'
import NavbarMain from '../../../components/Navbar/Navbar'
import '../../fabrics/glass/glass.css'
import '../mineral_wool/mineral_wool.module.css'
import styles from '../../Shop/Shop.module.css';
import { useTranslation } from 'react-i18next'
import Navbar_v2 from '../../../components/Navbar_v2/Navbar'



function Ceramic_wool_info(){
    const { t } = useTranslation(); // Hook do tłumaczeń

    return(
        <>
        <main className="Main_Glass">
        <section className="glass-fabric">
        <div className="container">
            <h2>{t('ceramicWoolInfo.characteristics.title')}</h2>
            <p>{t('ceramicWoolInfo.characteristics.description')}
            <br></br>
            {t('ceramicWoolInfo.characteristics.description2')}</p>
            <h3>{t('ceramicWoolInfo.properties.title')}</h3>
            <ul style={{textAlign:"left"}}>
                <li>
                    <strong>{t('ceramicWoolInfo.properties.highTemperature.title')}</strong> {t('ceramicWoolInfo.properties.highTemperature.description')}
                </li>
                <li>
                    <strong>{t('ceramicWoolInfo.properties.lowConductivity.title')}</strong> {t('ceramicWoolInfo.properties.lowConductivity.description')}
                </li>
                <li>
                    <strong>{t('ceramicWoolInfo.properties.chemicalResistance.title')}</strong> {t('ceramicWoolInfo.properties.chemicalResistance.description')}
                </li>
                <li>
                    <strong>{t('ceramicWoolInfo.properties.lightweight.title')}</strong> {t('ceramicWoolInfo.properties.lightweight.description')}
                </li>
                <li>
                    <strong>{t('ceramicWoolInfo.properties.thermalShock.title')}</strong> {t('ceramicWoolInfo.properties.thermalShock.description')}
                </li>
            </ul>
            <Row xs={2} sm={3} md={5} >
                    
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/fabrics/glass/termometr.jpg" className="card_img_glass" roundedCircle />
                    </Col>
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/Fillings/welna-mineralna/izolacyjnosc-termiczna.jpg" className="card_img_glass"  />
                    </Col>
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/Fillings/welna-mineralna/latwosc_montazu.jpg" className="card_img_glass"  />
                    </Col>
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/fabrics/glass/chemia.jpg" className="card_img_glass" roundedCircle />
                    </Col>
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src="/assets/materials/Fillings/welna-mineralna/odpornosc_na_zmiany_temp.jpg" className="card_img_glass"  />
                    </Col>
                    
                    
                </Row>
            <h3>{t('ceramicWoolInfo.forms.title')}</h3>
            <p>{t('ceramicWoolInfo.forms.description')}</p>
            <ul style={{textAlign:"left"}}>
                <li>
                    <strong>{t('ceramicWoolInfo.forms.aluminum.title')}</strong> {t('ceramicWoolInfo.forms.aluminum.description')}
                </li>
                <li>
                    <strong>{t('ceramicWoolInfo.forms.technicalFabrics.title')}</strong> {t('ceramicWoolInfo.forms.technicalFabrics.description')}
                </li>
            </ul>
            <h3>{t('ceramicWoolInfo.applications.title')}</h3>
            <p>{t('ceramicWoolInfo.applications.description')}</p>
            <ul style={{textAlign:"left"}}>
                <li>
                    <strong>{t('ceramicWoolInfo.applications.energyIndustry.title')}</strong> {t('ceramicWoolInfo.applications.energyIndustry.description')}
                </li>
                <li>
                    <strong>{t('ceramicWoolInfo.applications.metallurgy.title')}</strong> {t('ceramicWoolInfo.applications.metallurgy.description')}
                </li>
                <li>
                    <strong>{t('ceramicWoolInfo.applications.petrochemical.title')}</strong> {t('ceramicWoolInfo.applications.petrochemical.description')}
                </li>
                <li>
                    <strong>{t('ceramicWoolInfo.applications.heatingDevices.title')}</strong> {t('ceramicWoolInfo.applications.heatingDevices.description')}
                </li>
                <li>
                    <strong>{t('ceramicWoolInfo.applications.fireProtection.title')}</strong> {t('ceramicWoolInfo.applications.fireProtection.description')}
                </li>
            </ul>
            <h3>{t('ceramicWoolInfo.summary.title')}</h3>
            <p>{t('ceramicWoolInfo.summary.description')}</p>
        </div>    
        </section>    
        </main>
        </>
    )
}


export default function Ceramic_wool() {
    return(
        <>
        <Navbar_v2></Navbar_v2>
        <Ceramic_wool_info/>
        <Footer/>
        </>
    )
}