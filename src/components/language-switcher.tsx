'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pl' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant='outline'
      size='sm'
      className='fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm'
    >
      {i18n.language === 'en' ? 'PL' : 'EN'}
    </Button>
  );
};
