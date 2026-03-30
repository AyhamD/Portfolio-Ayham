// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './assets/i18n/en.json';
import translationSV from './assets/i18n/sv.json';

const resources = {
  en: {
    translation: translationEN,
  },
  sv:{
    translation: translationSV,
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") as string,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },backend: {
      loadPath: resources,
    },
  });

export default i18n;