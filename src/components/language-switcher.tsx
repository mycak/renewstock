'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Locale } from '@/lib/types/locale';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === Locale.EN ? Locale.PL : Locale.EN;
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language === Locale.EN ? 'English' : 'Polski';
  const targetLang = i18n.language === Locale.EN ? 'PL' : 'EN';

  return (
    <Button
      onClick={toggleLanguage}
      variant='outline'
      size='sm'
      className='fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:outline-none'
      aria-label={`Switch language to ${
        i18n.language === Locale.EN ? 'Polish' : 'English'
      }. Current language: ${currentLang}`}
      title={`Switch to ${i18n.language === Locale.EN ? 'Polish' : 'English'}`}
    >
      {targetLang}
    </Button>
  );
};
