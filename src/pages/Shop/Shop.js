import { Card, Col, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavbarMain from "../../components/Navbar/Navbar";
import styles from './Shop.module.css';
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import "../../i18n.js";
import Navbar_v2 from "../../components/Navbar_v2/Navbar.js";

function Product_Category_List() {
    const navigate = useNavigate();
    const { t } = useTranslation(); // Hook do tłumaczeń

    return (
        <div className={`${styles.product_category_list} container`} >
            <h1 className={styles.h1}>{t('productCategoryList.title')}</h1>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4" style={{ marginBottom: "20px" }}>
                <h3>{t('productCategoryList.fabrics.title')}</h3>
                <Col>
                    <Card onClick={() => navigate(`/Sklep/GLASS_FABRIC`)} className={styles.card} style={{ cursor: "pointer" }}>
                        <Card.Img variant="top" src="/assets/materials/fabrics/glass/Silikon_szary.jpg" className={styles.card_img} />
                        <Card.Body>
                            <Card.Title>{t('productCategoryList.fabrics.glassFabric')}</Card.Title>                        
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.card} onClick={() => navigate(`/Sklep/ARAMID_FABRIC`)}>
                        <Card.Img variant="top" src="/assets/materials/fabrics/Aramid/Tkanina_aramidowa.jpg" className={styles.card_img} />
                        <Card.Body>
                            <Card.Title>{t('productCategoryList.fabrics.aramidFabric')}</Card.Title>                        
                        </Card.Body>
                    </Card>
                </Col>  
            </Row>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4" style={{ marginBottom: "20px" }}>
                <h3>{t('productCategoryList.fillings.title')}</h3>
                <Col>
                    <Card className={styles.card} onClick={() => navigate(`/Sklep/MINERAL_WOOL`)}>
                        <Card.Img variant="top" src="/assets/materials/Fillings/welna-mineralna.jpg" className={styles.card_img} />
                        <Card.Body>
                            <Card.Title>{t('productCategoryList.fillings.mineralWool')}</Card.Title>                        
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.card} onClick={() => navigate(`/Sklep/CERAMIC_WOOL`)}>
                        <Card.Img variant="top" src="/assets/materials/Fillings/welna-ceramiczna.jpg" className={styles.card_img} />
                        <Card.Body>
                            <Card.Title>{t('productCategoryList.fillings.ceramicWool')}</Card.Title>                        
                        </Card.Body>
                    </Card>
                </Col> 
                <Col>
                    <Card className={styles.card} onClick={() => navigate(`/Sklep/GLASS_MAT`)}>
                        <Card.Img variant="top" src="/assets/materials/Fillings/mata-szklana.jpg" className={styles.card_img} />
                        <Card.Body>
                            <Card.Title>{t('productCategoryList.fillings.glassMat')}</Card.Title>                        
                        </Card.Body>
                    </Card>
                </Col> 
                
            </Row>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4" style={{ marginBottom: "20px" }}>
                <h3>{t('productCategoryList.services.title')}</h3>
                <Col>
                    <Card className={styles.card} onClick={() => navigate(`/Sklep/MEASUREMENT`)}>
                        <Card.Img variant="top" src="/assets/services/pomiary.jpg" className={styles.card_img} />
                        <Card.Body>
                            <Card.Title>{t('productCategoryList.services.measurement')}</Card.Title>                        
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.card} onClick={() => navigate(`/Sklep/PROJECT`)}>
                        <Card.Img variant="top" src="/assets/services/projekt.jpg" className={styles.card_img} />
                        <Card.Body>
                            <Card.Title>{t('productCategoryList.services.project')}</Card.Title>                        
                        </Card.Body>
                    </Card>
                </Col>                
                <Col>
                    <Card className={styles.card} onClick={() => navigate(`/Sklep/MATTRESS_PRODUCTION`)}>
                        <Card.Img variant="top" src="/assets/services/produkcja.jpg" className={styles.card_img} />
                        <Card.Body>
                            <Card.Title>{t('productCategoryList.services.mattressProduction')}</Card.Title>                        
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={styles.card} onClick={() => navigate(`/Sklep/INSTALLATION`)}>
                        <Card.Img variant="top" src="/assets/services/montaz.jpg" className={styles.card_img} />
                        <Card.Body>
                            <Card.Title>{t('productCategoryList.services.installation')}</Card.Title>                        
                        </Card.Body>
                    </Card>
                </Col>
                 
            </Row>
        </div>
    );
}



export default function Shop() {
    return (
        <>
            <Navbar_v2></Navbar_v2>
            <Product_Category_List></Product_Category_List>
            <Footer></Footer>
        </>
    );
}