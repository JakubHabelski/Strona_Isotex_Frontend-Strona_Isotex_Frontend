import { Helmet } from 'react-helmet';
import FabricsList from '../../../components/fabrics_list/fabrics_list';
import Footer from '../../../components/Footer';
import NavbarMain from '../../../components/Navbar/Navbar';
import Navbar_v2 from '../../../components/Navbar_v2/Navbar';
import './fabrics.css';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next'; // Import i18n
import { baseURL, logoURL, faviconURL } from '../../../config';

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
  const { t } = useTranslation();
    return(
        <>
        <Helmet>
        <title>{t('page_titles.fabrics.main_fabrics')}</title>
        <meta name="description" content={t('fabrics_info.meta.description')} />
        <meta name="keywords" content={t('fabrics_info.meta.keywords')} />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('page_titles.fabrics.main_fabrics')} />
        <meta name="twitter:description" content={t('fabrics_info.meta.description')} />
        <meta name="twitter:image" content={logoURL} />
        <meta property="og:title" content={t('page_titles.fabrics.main_fabrics')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={logoURL} />
        <meta property="og:url" content={`${baseURL}/tkaniny`} />
        <meta property="og:description" content={t('fabrics_info.meta.description')} />
        <meta property="og:site_name" content="Isotex Group Ilona Żurawa" />
        <link rel="canonical" href={`${baseURL}/tkaniny`} />
        <link rel="icon" type="image/png" href={faviconURL} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "${t('page_titles.fabrics.main_fabrics')}",
            "description": "${t('fabrics_info.meta.description')}",
            "url": "${baseURL}/tkaniny",
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
        <Navbar_v2></Navbar_v2>
        <Fabrics_Info/>
        
        <Footer/>
        </>
    )
}

export default Fabrics;