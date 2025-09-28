import { HeroSection } from '@/components/sections/hero-section';
import { DefinesUsSection } from '@/components/sections/defines-us-section';
import { WhereWeWorkSection } from '@/components/sections/where-we-work-section';
import { OurTeamSection } from '@/components/sections/our-team-section';
import { ContactSection } from '@/components/sections/contact-section';
import { LanguageSwitcher } from '@/components/language-switcher';

export default function Home() {
  return (
    <main>
      <LanguageSwitcher />
      <HeroSection />
      <DefinesUsSection />
      <WhereWeWorkSection />
      <OurTeamSection />
      <ContactSection />
    </main>
  );
}
