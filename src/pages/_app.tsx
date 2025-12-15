import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Geist, Geist_Mono, Anton } from 'next/font/google';
import { TolgeeProvider } from '@tolgee/react';
import { tolgee } from '@/lib/i18n';

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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initTolgee = async () => {
      await tolgee.run();
      await tolgee.changeLanguage(router.locale || 'en');
      setIsReady(true);
    };

    initTolgee();
  }, [router.locale]);

  if (!isReady) {
    return null;
  }

  return (
    <TolgeeProvider tolgee={tolgee} fallback='Loading...'>
      <div
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`}
      >
        <Component {...pageProps} />
      </div>
    </TolgeeProvider>
  );
}
