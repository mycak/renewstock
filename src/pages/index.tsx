import { NavigationHeader } from '@/components/navigation-header';
import { HeroSection } from '@/components/sections/hero-section';
import { DefinesUsSection } from '@/components/sections/defines-us-section';
import { WhereWeWorkSection } from '@/components/sections/where-we-work-section';
import { OurTeamSection } from '@/components/sections/our-team-section';
import { ContactSection } from '@/components/sections/contact-section';
import { MetaTags } from '@/components/seo/meta-tags';
import { SkipNavigation } from '@/components/seo/skip-navigation';

export default function Home() {
  return (
    <>
      <MetaTags />
      <SkipNavigation />
      <NavigationHeader />

      <main id='main-content'>
        <HeroSection />
        <DefinesUsSection />
        <WhereWeWorkSection />
        <OurTeamSection />
        <ContactSection />
      </main>
    </>
  );
}
