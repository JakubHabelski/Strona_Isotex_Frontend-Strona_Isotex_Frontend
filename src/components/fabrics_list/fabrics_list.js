import React from 'react';
import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';  // Import i18n
import style from './fabrics_list.module.css'

export default function FabricsList() {
  const { t } = useTranslation();  // Użyj hooka i18n do tłumaczenia

  function redirectToPage(page) {
    window.location.href = page; // względna ścieżka w Twojej aplikacji
  }

  return (
    <>
      <Card className={style.CardCustom} onClick={() => redirectToPage('/fabrics/glass')}>
        <Card.Img variant="top" src="/assets/materials/fabrics/glass.jpg" />
        <Card.Body>
          <Card.Title>{t("fabrics.glassFabrics")}</Card.Title> {/* Przetłumaczony tytuł */}
          <Card.Text>
            {t("fabrics.glassFabricsDescription")} {/* Przetłumaczenie tekstu */}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className={style.CardCustom} onClick={() => redirectToPage('/fabrics/aramid')}>
        <Card.Img variant="top" src="/assets/materials/fabrics/aramid.jpg" />
        <Card.Body>
          <Card.Title>{t("fabrics.aramidFabrics")}</Card.Title> {/* Przetłumaczony tytuł */}
          <Card.Text>
            {t("fabrics.aramidFabricsDescription")} {/* Przetłumaczenie tekstu */}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className={style.CardCustom}>
        <Card.Img variant="top" src="/assets/materials/fabrics/zuschnitte-stanzteile-gewebe.jpg" />
        <Card.Body>
          <Card.Title>{t("fabrics.cutParts")}</Card.Title> {/* Przetłumaczony tytuł */}
          <Card.Text>
            {t("fabrics.cutPartsDescription")} {/* Przetłumaczenie tekstu */}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
