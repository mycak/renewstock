import { HeroSection } from '@/components/hero-section';
import { LanguageSwitcher } from '@/components/language-switcher';

export default function Home() {
  return (
    <main>
      <LanguageSwitcher />
      <HeroSection />
    </main>
  );
}
