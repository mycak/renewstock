'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cleanupSplitTextAria } from '@/lib/gsap-utils';
import { H2, H3, P } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

export const SellersSection: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const content = contentRef.current;

    if (!section || !header || !content) return;

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    // Split header text - words only
    const headerSplit = SplitText.create(header, {
      type: 'words',
      wordsClass: 'split-word',
      tag: 'span',
    });

    // Remove any ARIA attributes that SplitText might have added
    cleanupSplitTextAria(header as HTMLElement, headerSplit);

    // Animate header words
    tl.from(headerSplit.words, {
      duration: 0.8,
      y: 100,
      autoAlpha: 0,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Animate separator after header
    const separator = section.querySelector('.separator');
    if (separator) {
      tl.from(
        separator,
        {
          duration: 0.6,
          scaleX: 0,
          transformOrigin: 'center',
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }

    // Animate content items
    const contentItems = content.querySelectorAll('.content-item');
    if (contentItems.length > 0) {
      tl.from(
        contentItems,
        {
          duration: 0.8,
          y: 60,
          autoAlpha: 0,
          stagger: 0.2,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }

    // Cleanup function
    return () => {
      headerSplit?.revert();
    };
  }, [t]); // Re-run effect when translations change

  const sellerFeatures = [
    'sellers.features.instant_cash_flow',
    'sellers.features.zero_risk_disposal',
    'sellers.features.brand_protection',
    'sellers.features.transparent_reporting',
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id='sellers' ref={sectionRef} className='py-20 px-4 bg-gray-50'>
      <div className='max-w-6xl mx-auto text-center'>
        {/* Header */}
        <H2
          ref={headerRef}
          className='font-black text-3xl md:text-3xl tracking-tight border-none'
          key={`header-${i18n.language}`}
        >
          {t('sellers.header')}
        </H2>

        {/* Separator */}
        <Separator className='separator w-24 mx-auto mb-12 h-1 bg-black' />

        {/* Content */}
        <div ref={contentRef} className='space-y-8'>
          {/* Description */}
          <div className='content-item'>
            <P className='text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed'>
              {t('sellers.description')}
            </P>
          </div>

          {/* Features Grid */}
          <div className='content-item grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12'>
            {sellerFeatures.map((featureKey, index) => (
              <div
                key={`${featureKey}-${i18n.language}-${index}`}
                className='bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-purple-300 transition-colors duration-300'
              >
                <H3 className='font-bold text-xl md:text-2xl mb-3 text-gray-800 border-none'>
                  {t(`${featureKey}.title`)}
                </H3>
                <P className='text-gray-600 leading-relaxed mt-0!'>
                  {t(`${featureKey}.description`)}
                </P>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className='content-item mt-12'>
            <div className='bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-8 text-white'>
              <H3 className='font-bold text-2xl md:text-3xl mb-4 border-none'>
                {t('sellers.cta.title')}
              </H3>
              <P className='text-lg text-purple-100 mt-0! mb-6'>
                {t('sellers.cta.description')}
              </P>
              <Button
                onClick={scrollToContact}
                variant='secondary'
                size='lg'
                className='bg-white text-purple-600 hover:bg-purple-50 transition-all duration-300 font-semibold px-8 py-3'
              >
                {t('common.get_in_touch')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
