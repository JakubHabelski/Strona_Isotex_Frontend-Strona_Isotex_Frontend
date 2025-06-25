import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import style from './LanguageSwitcher.module.css';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Zmiana języka, zapis do localStorage dzieje się w i18n.js
  };

  return (
    <div className={style.language_switcher}>
      
      
      <Button onClick={() => changeLanguage('pl')} size="sm" variant="light" disabled={i18n.language === "pl"}>PL</Button>
      <Button onClick={() => changeLanguage('en')} size="sm" variant="light" disabled={i18n.language === "en"}>EN</Button>
      <Button onClick={() => changeLanguage('de')} size="sm" variant="light" disabled={i18n.language === "de"}>DE</Button>
    </div>
  );
}

export default LanguageSwitcher;