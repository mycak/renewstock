'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Locale } from '@/lib/types/locale';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  /** Whether to use fixed positioning (for standalone usage) */
  isFixed?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  isFixed = true,
  className,
}) => {
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
      className={cn(
        isFixed ? 'fixed top-6 right-4 z-50' : 'relative',
        'bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:outline-none',
        className
      )}
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
