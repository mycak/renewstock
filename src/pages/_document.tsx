import { Html, Head, Main, NextScript } from 'next/document';

interface DocumentProps {
  __NEXT_DATA__?: {
    locale?: string;
  };
}

export default function Document(props: DocumentProps) {
  // Get locale from props (passed from Next.js)
  const locale = props.__NEXT_DATA__?.locale || 'en';

  return (
    <Html lang={locale}>
      <Head>
        {/* Essential meta tags that should be in document head */}
        <meta charSet='utf-8' />

        {/* Favicon */}
        <link rel='icon' href='/favicon.ico' />

        {/* Preconnect to external domains for performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />

        {/* DNS prefetch for performance */}
        <link rel='dns-prefetch' href='https://fonts.googleapis.com' />
      </Head>
      <body className='antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
