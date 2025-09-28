import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en/common.json';
import plTranslations from './locales/pl/common.json';
import { DEFAULT_LOCALE, Locale } from './types/locale';

const resources = {
  [Locale.EN]: {
    common: enTranslations,
  },
  [Locale.PL]: {
    common: plTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: DEFAULT_LOCALE,
  lng: DEFAULT_LOCALE, // Set default language for SSR
  defaultNS: 'common',
  ns: ['common'],

  interpolation: {
    escapeValue: false, // React already escapes values
  },

  // Disable automatic language detection since Next.js handles routing
  // We'll set the language manually based on Next.js locale
  detection: {
    order: [],
    caches: [],
  },

  // Prevent hydration issues
  react: {
    useSuspense: false,
  },
});

export default i18n;
