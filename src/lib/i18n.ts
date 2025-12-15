import { Tolgee, DevTools, FormatSimple } from '@tolgee/react';
import { DEFAULT_LOCALE } from './types/locale';

export const ALL_LANGUAGES = ['en', 'pl'];
const DEFAULT_NAMESPACE = 'default';

const isDevelopment = process.env.NODE_ENV === 'development';

const tolgeeInstance = Tolgee().use(FormatSimple());

// DevTools only in development for security (prevents unauthorized translation editing)
if (isDevelopment) {
  tolgeeInstance.use(DevTools());
}

export const tolgee = tolgeeInstance.init({
  availableLanguages: ALL_LANGUAGES,
  defaultLanguage: DEFAULT_LOCALE,
  // Namespace configuration to match Tolgee project structure
  defaultNs: DEFAULT_NAMESPACE,
  ns: [DEFAULT_NAMESPACE],
  // API credentials for fetching translations (dev or production if env vars are set)
  apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
  apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
  // Static data with namespace to match Tolgee API structure
  staticData: {
    'en:default': () => import('./locales/en/common.json'),
    'pl:default': () => import('./locales/pl/common.json'),
  },
});
