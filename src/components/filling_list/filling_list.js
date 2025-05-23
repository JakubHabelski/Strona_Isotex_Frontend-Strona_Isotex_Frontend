
import React from 'react';
import { Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next'; // Import i18n

export default function Filling_List() {
  const { t } = useTranslation();  // Użyj hooka i18n do tłumaczenia

  function redirectToPage(page) {
    window.location.href = page; // względna ścieżka w Twojej aplikacji
  }

  return (
    <>
      <Card onClick={() => redirectToPage('/wypelnienia/welna-mineralna')}>
        <Card.Img variant="top" src="/assets/materials/Fillings/welna-mineralna.jpg" className="card_img" />
        <Card.Body>
          <Card.Title>{t("fillings.mineralWool")}</Card.Title>  {/* Przetłumaczony tytuł */}
          <Card.Text>
            {t("fillings.mineralWoolDescription")}  {/* Przetłumaczenie tekstu */}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card  onClick={() => redirectToPage('/wypelnienia/welna-ceramiczna')}>
        <Card.Img variant="top" src="/assets/materials/Fillings/welna-ceramiczna.jpg" className="card_img" />
        <Card.Body>
          <Card.Title>{t("fillings.ceramicWool")}</Card.Title>  {/* Przetłumaczony tytuł */}
          <Card.Text>
            {t("fillings.ceramicWoolDescription")}  {/* Przetłumaczenie tekstu */}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card onClick={() => redirectToPage('/wypelnienia/mata-szklana')}>
        <Card.Img variant="top" src="/assets/materials/Fillings/mata-szklana.jpg" className="card_img" />
        <Card.Body>
          <Card.Title>{t("fillings.glassMat")}</Card.Title>  {/* Przetłumaczony tytuł */}
          <Card.Text>
            {t("fillings.glassMatDescription")}  {/* Przetłumaczenie tekstu */}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
