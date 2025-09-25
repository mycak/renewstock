import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en/common.json';
import plTranslations from './locales/pl/common.json';

const resources = {
  en: {
    common: enTranslations,
  },
  pl: {
    common: plTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // English as primary language
    lng: 'en', // Set default language for SSR
    defaultNS: 'common',
    ns: ['common'],

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order:
        typeof window !== 'undefined'
          ? ['localStorage', 'navigator', 'htmlTag']
          : ['htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: typeof window !== 'undefined' ? ['localStorage'] : [],
    },

    // Prevent hydration issues
    react: {
      useSuspense: false,
    },
  });

export default i18n;
