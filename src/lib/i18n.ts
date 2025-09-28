import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Locale, DEFAULT_LOCALE } from './types/locale';

// Import translation files
import enTranslations from './locales/en/common.json';
import plTranslations from './locales/pl/common.json';

const resources = {
  [Locale.EN]: {
    common: enTranslations,
  },
  [Locale.PL]: {
    common: plTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LOCALE,
    lng: DEFAULT_LOCALE, // Set default language for SSR
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
