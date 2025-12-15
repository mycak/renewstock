import { Tolgee, DevTools, FormatSimple, BackendFetch } from '@tolgee/react';
import { DEFAULT_LOCALE } from './types/locale';

export const ALL_LANGUAGES = ['en', 'pl'];

const isDevelopment = process.env.NODE_ENV === 'development';
const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;

const tolgeeInstance = Tolgee().use(FormatSimple());

// BackendFetch only when API credentials are available
console.log('Tolgee API Key:', apiKey);
console.log('Tolgee API URL:', apiUrl);
if (apiKey && apiUrl) {
  tolgeeInstance.use(BackendFetch());
}

// DevTools only in development for security (prevents unauthorized translation editing)
if (isDevelopment) {
  tolgeeInstance.use(DevTools());
}

export const tolgee = tolgeeInstance.init({
  availableLanguages: ALL_LANGUAGES,
  defaultLanguage: DEFAULT_LOCALE,
  // API credentials for fetching translations
  apiKey,
  apiUrl,
  // Fallback static data when API is not available
  staticData: {
    en: () => import('./locales/en/common.json'),
    pl: () => import('./locales/pl/common.json'),
  },
});
