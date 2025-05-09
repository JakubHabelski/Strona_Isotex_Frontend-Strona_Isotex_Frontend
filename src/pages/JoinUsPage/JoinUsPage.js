import style from './JoinUsPage.module.css';

import Navbar_v2 from "../../components/Navbar_v2/Navbar"
import Footer from "../../components/Footer"
import { Button, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';


function JoinUsPageForm() {
    const { t } = useTranslation();
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState('md-down');

    const apiUrl = process.env.REACT_APP_API_URL;
    const request = `${apiUrl}/apply`;

    const [formData, setFormData] = useState({
        name : '',
        email : '',
        tel : '',
        cv : ''

    })
    const handleInputChange = (e) => {
      const { name, value, files } = e.target;
      if (name === 'cv') {
          setFormData({ ...formData, [name]: files[0] }); // Przechowuj plik jako obiekt File
      } else {
          setFormData({ ...formData, [name]: value });
      }
  };
    console.log(formData)

    const handleSubmit = async (event) => {
      
  
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('tel', formData.tel);
      data.append('cv', formData.cv); // Dodaj plik jako część FormData
  
      try {
          await axios.post(request, data, {
              headers: { "Content-Type": "multipart/form-data" }
          });
          console.log("Form submitted successfully");
      } catch (error) {
          console.error("Error submitting form:", error);
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
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>{t('JoinUsPageForm.formBasicName.Name')}</Form.Label>
            <Form.Control 
                type="text" 
                placeholder={t('JoinUsPageForm.formBasicName.NamePlaceholder')} 
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required />
            <Form.Control.Feedback type="invalid">
              {t('JoinUsPageForm.formBasicName.ProvideName')}
            </Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t('JoinUsPageForm.formBasicEmail.Email')}</Form.Label>
            <Form.Control 
                type="email" 
                placeholder={t('JoinUsPageForm.formBasicEmail.EmailPlaceholder')} 
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required />
            <Form.Control.Feedback type="invalid">
              {t('JoinUsPageForm.formBasicEmail.ProvideEmail')}
            </Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>{t('JoinUsPageForm.formBasicPhone.Phone')}</Form.Label>
            <Form.Control 
                type="tel" 
                placeholder={t('JoinUsPageForm.formBasicPhone.PhonePlaceholder')} 
                name='tel'
                value={formData.tel}
                onChange={handleInputChange}
                required/>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicCV">
            <Form.Label>{t('JoinUsPageForm.formBasicCV.CV')}</Form.Label>
            <Form.Control 
                type="file" 
                accept=".pdf,.doc,.docx" 
                name='cv'
                onChange={handleInputChange}
                required />
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
  
          <Button variant="primary" type="submit">
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
    return(
        <>
        <Navbar_v2 />
        <JoinUsPageForm />
        <Footer />
        </>
    )
}