import '@/styles/globals.css';
import '@/lib/i18n'; // Initialize i18n
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Geist, Geist_Mono, Anton } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { i18n } = useTranslation();
  
  // Sync i18n language with Next.js router locale
  useEffect(() => {
    if (router.locale && router.locale !== i18n.language) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale, i18n]);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`}
    >
      <Component {...pageProps} />
    </div>
  );
}
