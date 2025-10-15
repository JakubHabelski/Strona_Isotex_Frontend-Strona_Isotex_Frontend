import { Button, Form } from "react-bootstrap"
import Footer from "../../components/Footer"
import Navbar_v2 from "../../components/Navbar_v2/Navbar"
import style from "./Contact.module.css"
import { form } from "motion/react-client"
import { useState } from "react"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet"
import { baseURL, apiURL, logoURL, faviconURL } from '../../config';
import ReCAPTCHA from "react-google-recaptcha"





function ContactUs() {
  const { t } = useTranslation();
  const [validated, setValidated] = useState(false);
  const [capVal, setCapVal] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const request = `${apiURL}/Contact_API/contact`;

  const [formData, setFormData] = useState({
    email: "",
    topic: "",
    text: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return t("ContactUs.form.emailInvalid") || "Niepoprawny email";
    if (!formData.topic.trim()) return t("ContactUs.form.topicRequired") || "Temat jest wymagany";
    if (!formData.text.trim()) return t("ContactUs.form.textRequired") || "Wiadomość jest wymagana";
    if (!capVal) return t("ContactUs.form.recaptcha.error") || "Proszę zweryfikować reCAPTCHA";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("Wysyłam formularz:", formData, "reCAPTCHA:", capVal); // Debug

    setValidated(true);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      console.error("Walidacja nieudana:", validationError); // Debug
      return;
    }

    const data = new FormData();
    data.append("email", formData.email);
    data.append("topic", formData.topic);
    data.append("text", formData.text);
    data.append("recaptchaToken", capVal);

    console.log("Wysyłam żądanie do:", request); // Debug
    try {
      const response = await axios.post(request, data);
      console.log("Odpowiedź z backendu:", response.data); // Debug
      setSuccess(t("ContactUs.form.success") || "Formularz wysłany pomyślnie!");
      setFormData({ email: "", topic: "", text: "" });
      setCapVal(null);
      setError("");
      setValidated(false);
    } catch (error) {
      const errorMsg = t("ContactUs.form.error") || `Błąd: ${error.response?.data || error.message}`;
      setError(errorMsg);
      console.error("Błąd w zapytaniu:", error); // Debug
    }
  };

  return (
    <div className={style.contactUsContainer}>
      <div className={style.contactUsHeader}>
        <h1>{t("page_titles.Contact")}</h1>
        <p>{t("ContactUs.intro")}</p>
        <h2>{t("ContactUs.details.title")}</h2>
          <p>
            <strong>{t("ContactUs.details.company")}</strong><br />
            ISOTEX GROUP Ilona Żurawa (NIP 9111824789)<br />
            ul. Daszyńskiego 9A, 56-500 Syców
          </p>
          <p>
            <strong>{t("ContactUs.details.email")}</strong><br />
            <a href="mailto:kontakt@isotex-poland.com">kontakt@isotex-poland.com</a>
          </p>
          <p>
            <strong>{t("ContactUs.details.phone")}</strong><br />
            <a href="tel:+48600511029">+48 600 511 029</a>
          </p>
      </div>
      
      <div className={style.contactUsContent}>
        {/*error && <div className={style.error}>{error}</div>*/}
        {/*success && <div className={style.success}>{success}</div>*/}
        <Form onSubmit={handleSubmit} method="post">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t("ContactUs.form.email.label")}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t("ContactUs.form.email.placeholder")}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTopic">
            <Form.Label>{t("ContactUs.form.topic.label")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("ContactUs.form.topic.placeholder")}
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t("ContactUs.form.message.label")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder={t("ContactUs.form.message.placeholder")}
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <ReCAPTCHA
              sitekey="6Ldd1pkrAAAAAHLlNXYRTCHLbgVAVr1PLpeqCUx_"
              onChange={(val) => setCapVal(val)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="outline-danger"
            className={`${style.contactUsButton} btn`}
            disabled={!capVal}
          >
            {t("ContactUs.form.submit_button")}
          </Button>
        </Form>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.6349348736167!2d17.713546569689093!3d51.30689363662549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710064da7d2efa5%3A0x877f1ad56e03be45!2sDaszy%C5%84skiego%209A%2C%2056-500%20Syc%C3%B3w!5e1!3m2!1spl!2spl!4v1745670997885!5m2!1spl!2spl"
          className={style.googleMap}
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t("ContactUs.map.title")}
        ></iframe>
      </div>
    </div>
  );
}





export default function Contact() {
    const { t, i18n } = useTranslation();
    return(
        <>
        <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
        <meta name="format-detection" content="telephone=no" />
        <title>{t("page_titles.Contact")}</title>
        <meta name="description" content={t("ContactUs.meta.description")} />
        <meta name="keywords" content={t("ContactUs.meta.keywords")} />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("page_titles.Contact")} />
        <meta name="twitter:description" content={t("ContactUs.meta.description")} />
        <meta name="twitter:image" content={logoURL} />
        <meta property="og:title" content={t("page_titles.Contact")} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={logoURL} />
        <meta property="og:url" content={`${baseURL}/kontakt`} />
        <meta property="og:description" content={t("ContactUs.meta.description")} />
        <meta property="og:site_name" content="Isotex Group Ilona Żurawa" />
        <link rel="canonical" href={`${baseURL}/kontakt`} />
        <link rel="icon" type="image/png" href={faviconURL} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "${t("page_titles.Contact")}",
            "description": "${t("ContactUs.meta.description")}",
            "url": "${baseURL}/kontakt",
            "publisher": {
              "@type": "Organization",
              "name": "Isotex Group",
              "logo": {
                "@type": "ImageObject",
                "url": "${logoURL}"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Daszyńskiego 9A",
                "addressLocality": "Syców",
                "postalCode": "56-500",
                "addressCountry": "PL"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "email": "kontakt@isotex-poland.com",
                  "url": "${baseURL}/kontakt"
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "telephone": "+48 600 511 029",
                  "url": "${baseURL}/kontakt"
                }
              ],
              "openingHours": "Mo-Fr 08:00-16:00"
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