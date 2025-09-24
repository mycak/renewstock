import '@/styles/globals.css';
import type { AppProps } from 'next/app';
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
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`}
    >
      <Component {...pageProps} />
    </div>
  );
}
