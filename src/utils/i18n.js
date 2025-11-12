import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
    },
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
    },
  },
  vi: {
    translation: {
      "Welcome to React": "noi dung",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
