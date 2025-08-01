import style from './JoinUsPage.module.css';
import Navbar_v2 from '../../components/Navbar_v2/Navbar';
import Footer from '../../components/Footer';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import apiURL from '../../config';
import ReCAPTCHA from 'react-google-recaptcha';

function JoinUsPageForm() {
  const { t } = useTranslation();
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState('md-down');
  const [capVal, setCapVal] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tel: '',
    cv: null,
  });

  const validateForm = () => {
    if (!formData.name.trim()) return t('JoinUsPageForm.formBasicName.ProvideName') || 'Imię jest wymagane';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return t('JoinUsPageForm.formBasicEmail.ProvideEmail') || 'Niepoprawny email';
    if (!formData.tel.match(/^\+?\d{9,15}$/)) return t('JoinUsPageForm.formBasicPhone.PhoneInvalid') || 'Niepoprawny numer telefonu';
    if (!formData.cv) return t('JoinUsPageForm.formBasicCV.ProvideCV') || 'Plik CV jest wymagany';
    if (formData.cv && !formData.cv.name.match(/\.pdf$/i)) return t('JoinUsPageForm.formBasicCV.InvalidCV') || 'CV musi być w formacie PDF';
    if (!capVal) return t('JoinUsPageForm.recaptchaRequired') || 'Proszę zweryfikować reCAPTCHA';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cv') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('tel', formData.tel);
    data.append('cv', formData.cv);
    data.append('recaptchaToken', capVal);

    try {
      const response = await axios.post(`${apiURL}/Contact_API/apply`, data);
      setSuccess(t('JoinUsPageForm.success') || 'Formularz wysłany pomyślnie!');
      setFormData({ name: '', email: '', tel: '', cv: null });
      setCapVal(null);
      setError('');
      setValidated(false);
    } catch (error) {
      setError(t('JoinUsPageForm.error') || `Błąd: ${error.response?.data || error.message}`);
    }
  };

  const handleShow = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow(true);
  };

  return (
    <div className={style.join_us_page}>
      <div className={style.join_us_header}>
        <h1>{t('JoinUsPageForm.Title')}</h1>
        <p>{t('JoinUsPageForm.SubTitle')}</p>
        <p style={{ textAlign: 'center' }}>{t('JoinUsPageForm.SubSubTitle')}</p>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className={style.form_join_us} encType="multipart/form-data">
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>{t('JoinUsPageForm.formBasicName.Name')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('JoinUsPageForm.formBasicName.NamePlaceholder')}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {t('JoinUsPageForm.formBasicName.ProvideName')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{t('JoinUsPageForm.formBasicEmail.Email')}</Form.Label>
          <Form.Control
            type="email"
            placeholder={t('JoinUsPageForm.formBasicEmail.EmailPlaceholder')}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {t('JoinUsPageForm.formBasicEmail.ProvideEmail')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>{t('JoinUsPageForm.formBasicPhone.Phone')}</Form.Label>
          <Form.Control
            type="tel"
            placeholder={t('JoinUsPageForm.formBasicPhone.PhonePlaceholder')}
            name="tel"
            value={formData.tel}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {t('JoinUsPageForm.formBasicPhone.PhoneInvalid')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCV">
          <Form.Label>{t('JoinUsPageForm.formBasicCV.CV')}</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf"
            name="cv"
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {t('JoinUsPageForm.formBasicCV.ProvideCV')}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            required
            label={
              <>
                {t('JoinUsPageForm.formBasicPrivacyPolicy.DataProcessingConsent')}{' '}
                <a href="#" onClick={() => handleShow('md-down')}>
                  {t('JoinUsPageForm.formBasicPrivacyPolicy.LearnMore')}
                </a>
              </>
            }
            feedback={t('JoinUsPageForm.formBasicPrivacyPolicy.DataProcessingConsentFeedback')}
            feedbackType="invalid"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <ReCAPTCHA
            sitekey="6LcZr5UrAAAAAAR2vs1WJqsbTYe6gr43PZF8-YJ9"
            onChange={(val) => setCapVal(val)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!capVal}>
          {t('JoinUsPageForm.formBasicSubmit.Submit')}
        </Button>
      </Form>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('JoinUsPageForm.Modal.Title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('JoinUsPageForm.Modal.Body')}</p>
          <p>
            {t('JoinUsPageForm.Modal.PrivacyPolicy')}{' '}
            <a href="/privacy-policy">LINK</a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            {t('JoinUsPageForm.Modal.Close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default function JoinUsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('page_titles.JoinUsPage')}</title>
        <link rel="icon" type="image/png" href="/assets/logo.png" />
        <meta name="description" content="Wysokiej jakości tkaniny i maty izolacyjne od Isotex Group. Przeglądaj nasze produktu i zamawiaj online!" />
        <meta name="keywords" content="tkaniny izolacyjne, maty izolacyjne, Isotex Group, materiały ognioodporne, sklep online" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{`
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Isotex Group Sklep",
                "description": "Sklep online z tkaninami i matami izolacyjnymi od Isotex Group.",
                "publisher": {
                    "@type": "Organization",
                    "name": "Isotex Group",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://testfunkcjonalonscisklepu.pl/assets/logo.png"
                    }
                }
            }
        `}</script>
      </Helmet>
      <Navbar_v2 />
      <JoinUsPageForm />
      <Footer />
    </>
  );
}