import Navbar from "../../../components/Navbar_v2/Navbar"
import Footer from '../../../components/Footer'
import { Col, Container, Image, ListGroup, Row } from "react-bootstrap"
import style from './MainPageShop.module.css'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


function MainPageShopMain(){

    const navigate = useNavigate();
    const { t } = useTranslation();

    return(
        <>
        
            <Row>
                <Col xs={12} md={2}>
                    <div className={style.MainPageShopLinks}>
                        <div onClick={() => navigate(`/Sklep/GLASS_FABRIC`)} style={{ cursor: "pointer" }}>
                            <Image src="/assets/fabric.png"></Image>
                            <p>{t('productCategoryList.main_cat.fabrics')}</p>
                            
                        </div>
                    </div>

                </Col>
                <Col xs={12} md={10}>
                
                </Col>
            </Row>
            
        
        </>
    )
}


export default function MainPageShop(){
    return(
        <>
        <Navbar></Navbar>
        <MainPageShopMain></MainPageShopMain>
        <Footer></Footer>
        </>
    )
}