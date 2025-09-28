import type { NextConfig } from "next";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./src/lib/types/locale";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    localeDetection: false, // We'll handle language detection through our i18n setup
  },
};

export default nextConfig;
