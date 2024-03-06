import i18next from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: String(localStorage.getItem("i18nextLng") || "uz"),
    fallbackLng: "uz",
    supportedLngs: ["uz", "ru", "kril"],
    interpolation: { escapeValue: false },
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json`,
    },
  });
