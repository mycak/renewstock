/**
 * Locale types for internationalization
 */

export enum Locale {
  EN = 'en',
  PL = 'pl',
}

export type LocaleType = `${Locale}`;

export const DEFAULT_LOCALE = Locale.EN;
export const SUPPORTED_LOCALES = Object.values(Locale);