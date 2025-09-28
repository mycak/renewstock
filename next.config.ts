import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    localeDetection: false, // We'll handle language detection through our i18n setup
  },
};

export default nextConfig;
