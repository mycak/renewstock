import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Locale } from '@/lib/types/locale';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}) => {
  const { t, i18n } = useTranslation('common');
  
  // Use provided values or fallback to translations
  const metaTitle = title || t('seo.title');
  const metaDescription = description || t('seo.description');
  const metaKeywords = keywords || t('seo.keywords');
  const ogTitle = t('seo.og.title');
  const ogDescription = t('seo.og.description');
  const ogImage = image || '/logo/animated-logo.gif';
  const twitterTitle = t('seo.twitter.title');
  const twitterDescription = t('seo.twitter.description');
  
  // Construct canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.renewstock.eu';
  const canonicalUrl = url || baseUrl;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  // Update document title when language changes
  useEffect(() => {
    document.title = metaTitle;
  }, [metaTitle]);

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content={i18n.language} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate language links for SEO */}
      <link rel="alternate" hrefLang={Locale.EN} href={`${baseUrl}?lang=${Locale.EN}`} />
      <link rel="alternate" hrefLang={Locale.PL} href={`${baseUrl}?lang=${Locale.PL}`} />
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="RenewStock" />
      <meta property="og:locale" content={i18n.language === Locale.EN ? 'en_US' : 'pl_PL'} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogTitle} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="RenewStock" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "RenewStock",
            "description": metaDescription,
            "url": baseUrl,
            "logo": `${baseUrl}/logo/renewstock-logo.png`,
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "business",
              "availableLanguage": [Locale.EN, Locale.PL],
              "telephone": "+48732923949",
              "email": "office@renewstock.eu"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "PL"
            },
            "sameAs": [
              // Add social media URLs when available
            ]
          })
        }}
      />
    </Head>
  );
};