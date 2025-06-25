// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationPL from "./locales/pl/translation.json";
import translationEN from "./locales/en/translation.json";
import translationDE from "./locales/de/translation.json";

const resources = {
  pl: { translation: translationPL },
  en: { translation: translationEN },
  de: { translation: translationDE },
};

// Pobierz język z localStorage, jeśli istnieje, lub użyj domyślnego 'pl'
const savedLanguage = localStorage.getItem("i18nextLng") || "pl";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // Ustaw język z localStorage
    fallbackLng: "pl",
    interpolation: {
      escapeValue: false,
    },
  });

// Opcjonalnie: zapisz język w localStorage przy każdej zmianie
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;