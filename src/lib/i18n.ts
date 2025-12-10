import { Tolgee, DevTools, FormatSimple } from '@tolgee/react';
import { DEFAULT_LOCALE } from './types/locale';

export const ALL_LANGUAGES = ['en', 'pl'];

export const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    availableLanguages: ALL_LANGUAGES,
    defaultLanguage: DEFAULT_LOCALE,
    apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
    apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
    staticData: {
      en: () => import('./locales/en/common.json'),
      pl: () => import('./locales/pl/common.json'),
    },
  });
