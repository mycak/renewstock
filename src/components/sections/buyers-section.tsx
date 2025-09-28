'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cleanupSplitTextAria } from '@/lib/gsap-utils';
import { H2, H3, P } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

export const BuyersSection: React.FC = () => {
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

    // Animate content items with more sophisticated animations
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

    // Add hover animations for benefit cards
    const benefitCards = content.querySelectorAll('.benefit-card');
    benefitCards.forEach((card) => {
      const cardElement = card as HTMLElement;
      
      cardElement.addEventListener('mouseenter', () => {
        gsap.to(cardElement, {
          scale: 1.02,
          y: -5,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      cardElement.addEventListener('mouseleave', () => {
        gsap.to(cardElement, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    // Cleanup function
    return () => {
      headerSplit?.revert();
    };
  }, [t]); // Re-run effect when translations change

  const buyerBenefits = [
    'buyers.benefits.curated_quality',
    'buyers.benefits.competitive_pricing',
    'buyers.benefits.reliable_supply',
    'buyers.benefits.logistics_support',
  ];

  return (
    <section id='buyers' ref={sectionRef} className='py-20 px-4 bg-gray-50'>
      <div className='max-w-6xl mx-auto text-center'>
        {/* Header */}
        <H2
          ref={headerRef}
          className='font-black text-3xl md:text-3xl tracking-tight border-none'
          key={`header-${i18n.language}`}
        >
          {t('buyers.header')}
        </H2>

        {/* Separator */}
        <Separator className='separator w-24 mx-auto mb-12 h-1 bg-black' />

        {/* Content */}
        <div ref={contentRef} className='space-y-8'>
          {/* Description */}
          <div className='content-item'>
            <P className='text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed'>
              {t('buyers.description')}
            </P>
          </div>

          {/* Benefits Grid */}
          <div className='content-item grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12'>
            {buyerBenefits.map((benefitKey, index) => (
              <div
                key={`${benefitKey}-${i18n.language}-${index}`}
                className='benefit-card bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300'
              >
                <H3 className='font-bold text-xl md:text-2xl mb-3 text-gray-800 border-none'>
                  {t(`${benefitKey}.title`)}
                </H3>
                <P className='text-gray-600 leading-relaxed mt-0!'>
                  {t(`${benefitKey}.description`)}
                </P>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className='content-item mt-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto'>
              <div className='text-center'>
                <H3 className='font-black text-4xl md:text-5xl text-purple-600 border-none'>
                  {t('buyers.stats.satisfaction')}
                </H3>
                <P className='text-gray-600 mt-2 mt-0!'>
                  {t('buyers.stats.satisfaction_label')}
                </P>
              </div>
              <div className='text-center'>
                <H3 className='font-black text-4xl md:text-5xl text-purple-600 border-none'>
                  {t('buyers.stats.delivery_time')}
                </H3>
                <P className='text-gray-600 mt-2 mt-0!'>
                  {t('buyers.stats.delivery_time_label')}
                </P>
              </div>
              <div className='text-center'>
                <H3 className='font-black text-4xl md:text-5xl text-purple-600 border-none'>
                  {t('buyers.stats.regions')}
                </H3>
                <P className='text-gray-600 mt-2 mt-0!'>
                  {t('buyers.stats.regions_label')}
                </P>
              </div>
            </div>
          </div>

          {/* Partnership Call to Action */}
          <div className='content-item mt-12'>
            <div className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white'>
              <H3 className='font-bold text-2xl md:text-3xl mb-4 border-none'>
                {t('buyers.cta.title')}
              </H3>
              <P className='text-lg text-blue-100 mt-0!'>
                {t('buyers.cta.description')}
              </P>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};