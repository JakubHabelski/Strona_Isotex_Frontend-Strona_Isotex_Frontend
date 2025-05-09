import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-light py-4" style={{ position: "relative", width: "100%", bottom: "0", marginTop: "auto" }}>
      <Container>
        <Row>
          <Col md={4}>
            <h5>{t("footer.visitUs")}</h5>
            <p>{t("footer.address")} <br />
              ISOTEX GROUP Ilona Żurawa <br />
              (NIP 9111824789) <br />
              ul. Daszyńskiego 9a <br />
              56-500 Syców <br />
              {t("footer.email")} <br />
              tel: +48 600 511 029 <br />
            </p>
          </Col>
          <Col md={4}>
            <h5>{t("footer.regulationsPolicies")}</h5>
            <p><a href='/assets/polityka/Polityka-jakosci.pdf' className='footer_link'>{t("footer.qualityPolicy")}</a></p>
            <p><a href='/assets/polityka/cert-qms-isotex-group-ilona-zurawa-eng.pdf' className='footer_link'>{t("footer.hygienicCertificate")}</a></p>
          </Col>
          <Col md={4}>
            <h5>{t("footer.certifications")}</h5>
            <img src='/assets/certyfikaty/logo-nizp-atest-pib.jpeg' style={{ width: "200px" }} />
            <img src='/assets/certyfikaty/system-iso-9001.jpeg' style={{ width: "200px" }} />
            <p style={{ marginTop: "20px" }}>
              <a href='/assets/certyfikaty/cert-qms-isotex-group-ilona-zurawa-pl.pdf' className='footer_link'>
                {t("footer.certificationPL")}
              </a>
            </p>
            <p><a href='/assets/certyfikaty/cert-qms-isotex-group-ilona-zurawa-de.pdf' className='footer_link'>{t("footer.certificationDE")}</a></p>
            <p><a href='/assets/certyfikaty/cert-qms-isotex-group-ilona-zurawa-fr.pdf' className='footer_link'>{t("footer.certificationFR")}</a></p>
            <p><a href='/assets/certyfikaty/cert-qms-isotex-group-ilona-zurawa-eng.pdf' className='footer_link'>{t("footer.certificationENG")}</a></p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <p className="mb-0">&copy; {new Date().getFullYear()} Isotex Group. {t("footer.allRightsReserved")}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
