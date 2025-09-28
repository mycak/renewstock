'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Locale } from '@/lib/types/locale';

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();

  const toggleLanguage = () => {
    const newLang = router.locale === Locale.EN ? Locale.PL : Locale.EN;
    // Use Next.js router to change locale, which will update the URL
    router.push(router.asPath, router.asPath, { locale: newLang });
  };

  // Use router.locale as the source of truth for the current language
  const currentLanguage = router.locale || Locale.EN;
  const currentLang = currentLanguage === Locale.EN ? 'English' : 'Polski';
  const targetLang = currentLanguage === Locale.EN ? 'PL' : 'EN';

  return (
    <Button
      onClick={toggleLanguage}
      variant='outline'
      size='sm'
      className='fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:outline-none'
      aria-label={`Switch language to ${
        currentLanguage === Locale.EN ? 'Polish' : 'English'
      }. Current language: ${currentLang}`}
      title={`Switch to ${
        currentLanguage === Locale.EN ? 'Polish' : 'English'
      }`}
    >
      {targetLang}
    </Button>
  );
};
