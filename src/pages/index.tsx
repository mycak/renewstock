import { NavigationHeader } from '@/components/navigation-header';
import { HeroSection } from '@/components/sections/hero-section';
import { SellersSection } from '@/components/sections/sellers-section';
import { BuyersSection } from '@/components/sections/buyers-section';
import { DefinesUsSection } from '@/components/sections/defines-us-section';
import { BrandStorySection } from '@/components/sections/brand-story-section';
import { ProcessSection } from '@/components/sections/process-section';
import { PartnershipSection } from '@/components/sections/partnership-section';
import { StandardsSection } from '@/components/sections/standards-section';
import { WhereWeWorkSection } from '@/components/sections/where-we-work-section';
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
        <SellersSection />
        <BuyersSection />
        <BrandStorySection />
        <ProcessSection />
        <PartnershipSection />
        <StandardsSection />
        <WhereWeWorkSection />
        <ContactSection />
      </main>
    </>
  );
}
