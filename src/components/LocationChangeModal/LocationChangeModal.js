import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";



export default function LocationChangeModal() {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  if (localStorage.getItem('modal_state') != 1) {
    localStorage.setItem('modal_state', 1);
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{t('LocationChangeModal.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{t('LocationChangeModal.description')}</p>
            <div className="contact-info">
              <p>
                <MapPin /> {t('LocationChangeModal.contact.address')}
              </p>
              <p>
                <Phone /> {t('LocationChangeModal.contact.phone')}
              </p>
              <p>
                <Mail /> {t('LocationChangeModal.contact.email')}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              {t('LocationChangeModal.button')}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return <></>;
  }
}