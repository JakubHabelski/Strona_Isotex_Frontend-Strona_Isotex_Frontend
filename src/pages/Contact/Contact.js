import { Button, Form } from "react-bootstrap"
import Footer from "../../components/Footer"
import Navbar_v2 from "../../components/Navbar_v2/Navbar"
import style from "./Contact.module.css"
import { form } from "motion/react-client"
import { useState } from "react"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet"
import apiURL from '../../config';
import ReCAPTCHA from "react-google-recaptcha"





function ContactUs() {
    const { t } = useTranslation();

    const [capVal, setCapVal] = useState(null)
   // const apiUrl = process.env.REACT_APP_API_URL;
    const request = `${apiURL}/contact`;


    const [formData, setFormData] = useState({
        email: '',
        topic: '',
        text: ''
    })

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value })
        
    }
    console.log(formData)

    const handleSubmit = async () =>{
        const data = new FormData();
        data.append('email', formData.email);
        data.append('topic', formData.topic);
        data.append('text', formData.text);


        try{
            await axios.post(request, data, {
                headers: { "Content-Type": "application/json" }
            });

        } catch(error){

        }
    }

    return(
        <div className={style.contactUsContainer}>
        <h1>{t('ContactUs.title')}</h1>
        <div className={style.contactUsContent}>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('ContactUs.form.email.label')}</Form.Label>
                <Form.Control
                type="email"
                placeholder={t('ContactUs.form.email.placeholder')}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTopic">
                <Form.Label>{t('ContactUs.form.topic.label')}</Form.Label>
                <Form.Control
                type="text"
                placeholder={t('ContactUs.form.topic.placeholder')}
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{t('ContactUs.form.message.label')}</Form.Label>
                <Form.Control
                as="textarea"
                rows={5}
                placeholder={t('ContactUs.form.message.placeholder')}
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <ReCAPTCHA
                    sitekey="6LcZr5UrAAAAAAR2vs1WJqsbTYe6gr43PZF8-YJ9"
                    onChange={(val => setCapVal(val))}
                ></ReCAPTCHA>
            </Form.Group>
            <Button
                type="submit"
                variant="outline-danger"
                className={`${style.contactUsButton} btn`}
                disabled={!capVal}
            >
                {t('ContactUs.form.submit_button')}
            </Button>
            </Form>
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.6349348736167!2d17.713546569689093!3d51.30689363662549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710064da7d2efa5%3A0x877f1ad56e03be45!2sDaszy%C5%84skiego%209A%2C%2056-500%20Syc%C3%B3w!5e1!3m2!1spl!2spl!4v1745670997885!5m2!1spl!2spl"
            className={style.googleMap}
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t('ContactUs.map.title')}
            ></iframe>
        </div>
        </div>
    )
}





export default function Contact() {
    const { t, i18n } = useTranslation();
    return(
        <>
                <Helmet>
                <title>{t("page_titles.Contact")}</title>
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
            <Navbar_v2></Navbar_v2>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </>
    )
}