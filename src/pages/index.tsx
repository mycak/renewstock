import { NavigationHeader } from '@/components/navigation-header';
import { HeroSection } from '@/components/sections/hero-section';

import { PartnershipSection } from '@/components/sections/partnership-section';
import { WhereWeWorkSection } from '@/components/sections/where-we-work-section';
import { InventorySolutionsSection } from '@/components/sections/inventory-solutions-section';
// import { TrustedPlatformSection } from '@/components/sections/trusted-platform-section';
import { FeaturedInventorySection } from '@/components/sections/featured-inventory-section';
import { ImageCardsSection } from '@/components/sections/image-cards-section';
import { HeroCardSection } from '@/components/sections/hero-card-section';
import { ContactSection } from '@/components/sections/contact-section';
import { MetaTags } from '@/components/seo/meta-tags';
import { SkipNavigation } from '@/components/seo/skip-navigation';
import { DefinesUsSection } from '@/components/sections/defines-us-section';

export default function Home() {
  return (
    <>
      <MetaTags />
      <SkipNavigation />
      <NavigationHeader />

      <main id='main-content'>
        <HeroSection />
        <DefinesUsSection />
        <InventorySolutionsSection />
        <HeroCardSection />
        <FeaturedInventorySection />
        {/* <TrustedPlatformSection /> */}
        <PartnershipSection />
        <ImageCardsSection />
        <WhereWeWorkSection />
        <ContactSection />
      </main>
    </>
  );
}
