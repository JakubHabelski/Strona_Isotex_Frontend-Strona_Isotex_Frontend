import { Card, Col, Image, Row } from 'react-bootstrap'
import Footer from '../../../components/Footer'
import NavbarMain from '../../../components/Navbar/Navbar'
import '../../fabrics/glass/glass.css'
import styles_table from '../mineral_wool/mineral_wool.module.css'
import styles from '../../Shop/Shop.module.css';
import { useTranslation } from 'react-i18next';
import Navbar_v2 from '../../../components/Navbar_v2/Navbar'

function Glass_Mat_Info(){
    const { t } = useTranslation(); // Hook do tłumaczeń

    return(
        <>
        <main className="Main_Glass">
        <section className="glass-fabric">
        <div className="container">
            <h2>{t('glassMatInfo.characteristics.title')}</h2>
            <p>{t('glassMatInfo.characteristics.description')}</p>
            <h3>{t('glassMatInfo.properties.title')}</h3>
            <p>{t('glassMatInfo.properties.description')}</p>
            <ul style={{textAlign: "left"}}>
                <li>
                    <strong>{t('glassMatInfo.properties.highTemperature.title')}</strong> {t('glassMatInfo.properties.highTemperature.description')}
                </li>
                <li>
                    <strong>{t('glassMatInfo.properties.nonFlammability.title')}</strong> {t('glassMatInfo.properties.nonFlammability.description')}
                </li>
                <li>
                    <strong>{t('glassMatInfo.properties.flexibility.title')}</strong> {t('glassMatInfo.properties.flexibility.description')}
                </li>
                <li>
                    <strong>{t('glassMatInfo.properties.chemicalResistance.title')}</strong> {t('glassMatInfo.properties.chemicalResistance.description')}
                </li>
                <li>
                    <strong>{t('glassMatInfo.properties.biologicalResistance.title')}</strong> {t('glassMatInfo.properties.biologicalResistance.description')}
                </li>
                <li>
                    <strong>{t('glassMatInfo.properties.acousticInsulation.title')}</strong> {t('glassMatInfo.properties.acousticInsulation.description')}
                </li>
            </ul>
            <Row xs={2} sm={3} md={4} lg={5} xl={6} >
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                <Image src="/assets/materials/fabrics/glass/termometr.jpg" className="card_img_glass" roundedCircle />
                </Col>
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                <Image src="/assets/materials/Fillings/welna-mineralna/niepalnosc.jpg" className="card_img_glass"  />
                </Col>
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                <Image src="/assets/materials/Fillings/welna-mineralna/latwosc_montazu.jpg" className="card_img_glass"  />
                </Col>
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                <Image src="/assets/materials/fabrics/glass/chemia.jpg" className="card_img_glass" roundedCircle />
                </Col>
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                <Image src="/assets/materials/Fillings/welna-mineralna/odpornosc_na_korozje.jpg" className="card_img_glass"  />
                </Col>
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                <Image src="/assets/materials/Fillings/welna-mineralna/Izolacyjność-akustyczna.jpg" className="card_img_glass"  />
                </Col>
            </Row>
            <section className="p-4 bg-gray-50 d-none d-md-block">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-center">{t('glassMatInfo.comparison.title')}</h2>
                    <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm md:text-base">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border">{t('glassMatInfo.comparison.table.type')}</th>
                            <th className="p-3 border">{t('glassMatInfo.comparison.table.description')}</th>
                            <th className="p-3 border">{t('glassMatInfo.comparison.table.binder')}</th>
                            <th className="p-3 border">{t('glassMatInfo.comparison.table.applications')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="p-3 border font-semibold">{t('glassMatInfo.comparison.table.csm.type')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.csm.description')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.csm.binder')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.csm.applications')}</td>
                        </tr>
                        <tr>
                            <td className="p-3 border font-semibold">{t('glassMatInfo.comparison.table.emulsion.type')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.emulsion.description')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.emulsion.binder')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.emulsion.applications')}</td>
                        </tr>
                        <tr>
                            <td className="p-3 border font-semibold">{t('glassMatInfo.comparison.table.powder.type')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.powder.description')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.powder.binder')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.powder.applications')}</td>
                        </tr>
                        <tr>
                            <td className="p-3 border font-semibold">{t('glassMatInfo.comparison.table.needle.type')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.needle.description')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.needle.binder')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.needle.applications')}</td>
                        </tr>
                        <tr>
                            <td className="p-3 border font-semibold">{t('glassMatInfo.comparison.table.coated.type')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.coated.description')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.coated.binder')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.coated.applications')}</td>
                        </tr>
                        <tr>
                            <td className="p-3 border font-semibold">{t('glassMatInfo.comparison.table.loose.type')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.loose.description')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.loose.binder')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.loose.applications')}</td>
                        </tr>
                        <tr>
                            <td className="p-3 border font-semibold">{t('glassMatInfo.comparison.table.automotive.type')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.automotive.description')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.automotive.binder')}</td>
                            <td className="p-3 border">{t('glassMatInfo.comparison.table.automotive.applications')}</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                </section>
                <section className="p-4 bg-gray-50 d-md-none">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-center">{t('glassMatInfo.comparison.title')}</h2>
                    
                    <div className="d-flex flex-column gap-4">
                    
                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h3 className="text-lg font-semibold mb-2">{t('glassMatInfo.comparison.mobile.csm.type')}</h3>
                        <p><strong>{t('glassMatInfo.comparison.mobile.csm.descriptionTitle')}</strong> {t('glassMatInfo.comparison.mobile.csm.description')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.csm.binderTitle')}</strong> {t('glassMatInfo.comparison.mobile.csm.binder')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.csm.applicationsTitle')}</strong> {t('glassMatInfo.comparison.mobile.csm.applications')}</p>
                    </div>

                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h3 className="text-lg font-semibold mb-2">{t('glassMatInfo.comparison.mobile.emulsion.type')}</h3>
                        <p><strong>{t('glassMatInfo.comparison.mobile.emulsion.descriptionTitle')}</strong> {t('glassMatInfo.comparison.mobile.emulsion.description')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.emulsion.binderTitle')}</strong> {t('glassMatInfo.comparison.mobile.emulsion.binder')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.emulsion.applicationsTitle')}</strong> {t('glassMatInfo.comparison.mobile.emulsion.applications')}</p>
                    </div>

                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h3 className="text-lg font-semibold mb-2">{t('glassMatInfo.comparison.mobile.powder.type')}</h3>
                        <p><strong>{t('glassMatInfo.comparison.mobile.powder.descriptionTitle')}</strong> {t('glassMatInfo.comparison.mobile.powder.description')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.powder.binderTitle')}</strong> {t('glassMatInfo.comparison.mobile.powder.binder')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.powder.applicationsTitle')}</strong> {t('glassMatInfo.comparison.mobile.powder.applications')}</p>
                    </div>

                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h3 className="text-lg font-semibold mb-2">{t('glassMatInfo.comparison.mobile.needle.type')}</h3>
                        <p><strong>{t('glassMatInfo.comparison.mobile.needle.descriptionTitle')}</strong> {t('glassMatInfo.comparison.mobile.needle.description')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.needle.binderTitle')}</strong> {t('glassMatInfo.comparison.mobile.needle.binder')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.needle.applicationsTitle')}</strong> {t('glassMatInfo.comparison.mobile.needle.applications')}</p>
                    </div>

                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h3 className="text-lg font-semibold mb-2">{t('glassMatInfo.comparison.mobile.coated.type')}</h3>
                        <p><strong>{t('glassMatInfo.comparison.mobile.coated.descriptionTitle')}</strong> {t('glassMatInfo.comparison.mobile.coated.description')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.coated.binderTitle')}</strong> {t('glassMatInfo.comparison.mobile.coated.binder')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.coated.applicationsTitle')}</strong> {t('glassMatInfo.comparison.mobile.coated.applications')}</p>
                    </div>

                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h3 className="text-lg font-semibold mb-2">{t('glassMatInfo.comparison.mobile.loose.type')}</h3>
                        <p><strong>{t('glassMatInfo.comparison.mobile.loose.descriptionTitle')}</strong> {t('glassMatInfo.comparison.mobile.loose.description')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.loose.binderTitle')}</strong> {t('glassMatInfo.comparison.mobile.loose.binder')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.loose.applicationsTitle')}</strong> {t('glassMatInfo.comparison.mobile.loose.applications')}</p>
                    </div>

                    <div className="bg-white border border-gray-300 rounded shadow p-3 mb-4">
                        <h3 className="text-lg font-semibold mb-2">{t('glassMatInfo.comparison.mobile.automotive.type')}</h3>
                        <p><strong>{t('glassMatInfo.comparison.mobile.automotive.descriptionTitle')}</strong> {t('glassMatInfo.comparison.mobile.automotive.description')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.automotive.binderTitle')}</strong> {t('glassMatInfo.comparison.mobile.automotive.binder')}</p>
                        <p><strong>{t('glassMatInfo.comparison.mobile.automotive.applicationsTitle')}</strong> {t('glassMatInfo.comparison.mobile.automotive.applications')}</p>
                    </div>

                    </div>
                </div>
                </section>


            <h3>{t('glassMatInfo.advantages.title')}</h3>
            <ul style={{textAlign: "left", display: "flex", flexDirection: "column"}}>
                <li>
                    <strong>{t('glassMatInfo.advantages.lightweight.title')}</strong> {t('glassMatInfo.advantages.lightweight.description')}
                </li>
                <li>
                    <strong>{t('glassMatInfo.advantages.flexibility.title')}</strong> {t('glassMatInfo.advantages.flexibility.description')}
                </li>
                <li>
                    <strong>{t('glassMatInfo.advantages.durability.title')}</strong> {t('glassMatInfo.advantages.durability.description')}
                </li>
                <li>
                    <strong>{t('glassMatInfo.advantages.fireSafety.title')}</strong> {t('glassMatInfo.advantages.fireSafety.description')}
                </li>
                <li>
                    <strong>{t('glassMatInfo.advantages.noiseReduction.title')}</strong> {t('glassMatInfo.advantages.noiseReduction.description')}
                </li>
            </ul>   
            <h3>{t('glassMatInfo.summary.title')}</h3>
            <p>{t('glassMatInfo.summary.description')}</p>
        </div>
        </section>
        </main>
        </>
    )
}


export default function Glass_Mat(){
    return(
        <>
        <Navbar_v2></Navbar_v2>
        <Glass_Mat_Info/>
        <Footer></Footer>
        </>
    )
}