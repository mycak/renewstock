'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Locale } from '@/lib/types/locale';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = router.locale === Locale.EN ? Locale.PL : Locale.EN;

    // Use Next.js router to change locale, which will update the URL
    router.push(router.asPath, router.asPath, { locale: newLang });
  };

  // Use router.locale as the source of truth for the current language
  const currentLanguage = router.locale || Locale.EN;

  return (
    <Button
      onClick={toggleLanguage}
      variant='outline'
      size='sm'
      className='fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:outline-none'
      aria-label={`Switch language to ${
        i18n.language === Locale.EN ? 'Polish' : 'English'
      }. Current language: ${currentLanguage}`}
      title={`Switch to ${i18n.language === Locale.EN ? 'Polish' : 'English'}`}
    >
      {currentLanguage === 'en' ? 'PL' : 'EN'}
    </Button>
  );
};
