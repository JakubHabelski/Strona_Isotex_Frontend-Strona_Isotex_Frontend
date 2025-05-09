import FabricsList from '../../../components/fabrics_list/fabrics_list';
import Footer from '../../../components/Footer';
import NavbarMain from '../../../components/Navbar/Navbar';
import Navbar_v2 from '../../../components/Navbar_v2/Navbar';
import './fabrics.css';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next'; // Import i18n

function Fabrics_Info() {
    const { t } = useTranslation(); // Hook do tłumaczenia
  
    return (
      <>
        <div>
          {/* Sekcja z obrazkiem i tekstem na overlayu */}
          <section className="hero-section">
            <div className="hero-overlay">
              <h1>{t('fabrics_info.fabricsTitle')}</h1> {/* Przetłumaczony tytuł */}
            </div>
            <img src="/assets/materials/fabrics/glass/glass-fiber-fabric.jpeg" className="hero-image" />
          </section>
  
          {/* Ogólny opis */}
          <section className="py-5 px-3 bg-light">
            <div className="container">
              <p className="lead text-center">
                {t('fabrics_info.generalDescription')} {/* Przetłumaczony ogólny opis */}
              </p>
            </div>
          </section>
  
          {/* Podział na szklaną i aramidową */}
          <section className="py-5">
            <div className="container">
              <div className="row">
                <Row xs={1} md={4} className="g-2" style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
                  <FabricsList />
                </Row>
              </div>
            </div>
          </section>
          <section className="py-5 bg-light"></section>
        </div>
      </>
    );
  }


 function Fabrics() {
    return(
        <>
        <Navbar_v2></Navbar_v2>
        <Fabrics_Info/>
        
        <Footer/>
        </>
    )
}

export default Fabrics;