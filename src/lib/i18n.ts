import {
  Tolgee,
  DevTools,
  FormatSimple,
  DevBackend,
} from '@tolgee/react';
import { DEFAULT_LOCALE } from './types/locale';

export const ALL_LANGUAGES = ['en', 'pl'];

const isDevelopment = process.env.NODE_ENV === 'development';
const hasApiCredentials =
  process.env.NEXT_PUBLIC_TOLGEE_API_KEY &&
  process.env.NEXT_PUBLIC_TOLGEE_API_URL;

// Create Tolgee instance with base plugins
const tolgeeBuilder = Tolgee().use(FormatSimple());

// DevBackend fetches translations from Tolgee API when credentials are available
if (hasApiCredentials) {
  tolgeeBuilder.use(DevBackend());
}

// DevTools only in development for in-context editing
if (isDevelopment) {
  tolgeeBuilder.use(DevTools());
}

export const tolgee = tolgeeBuilder.init({
  availableLanguages: ALL_LANGUAGES,
  defaultLanguage: DEFAULT_LOCALE,
  apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
  apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
  // Static data fallback when API is not available
  staticData: {
    en: () => import('./locales/en/common.json'),
    pl: () => import('./locales/pl/common.json'),
  },
});
