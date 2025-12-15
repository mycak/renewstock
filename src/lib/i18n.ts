import { Tolgee, DevTools, FormatSimple } from '@tolgee/react';
import { DEFAULT_LOCALE } from './types/locale';

export const ALL_LANGUAGES = ['en', 'pl'];

const isDevelopment = process.env.NODE_ENV === 'development';

const tolgeeInstance = Tolgee().use(FormatSimple());

// DevTools only in development for security (prevents unauthorized translation editing)
if (isDevelopment) {
  tolgeeInstance.use(DevTools());
}

export const tolgee = tolgeeInstance.init({
  availableLanguages: ALL_LANGUAGES,
  defaultLanguage: DEFAULT_LOCALE,
  // API credentials for fetching translations (dev or production if env vars are set)
  apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
  apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
  // Fallback static data when API key is not available
  staticData: {
    en: () => import('./locales/en/common.json'),
    pl: () => import('./locales/pl/common.json'),
  },
});
