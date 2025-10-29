'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { H2, H3, P } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import {
  createScrollTimeline,
  cleanupScrollTriggers,
} from '@/lib/gsap-animations';

export const ProcessSection: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const tl = createScrollTimeline({
      trigger: section,
      start: 'top 70%',
      end: 'bottom 30%',
    });

    // Animate header
    tl.from(header, {
      y: 40,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Animate cards with stagger
    const processCards = cards.querySelectorAll('.process-card');
    tl.from(
      processCards,
      {
        y: 60,
        autoAlpha: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    return () => {
      cleanupScrollTriggers(section);
    };
  }, [i18n.language]);

  const processSteps = [
    {
      key: 'clear_process',
      titleKey: 'process.steps.clear_process.title',
      descriptionKey: 'process.steps.clear_process.description',
      detailsKey: 'process.steps.clear_process.details',
    },
    {
      key: 'full_visibility',
      titleKey: 'process.steps.full_visibility.title',
      descriptionKey: 'process.steps.full_visibility.description',
      pointsKey: 'process.steps.full_visibility.points',
      partnershipKey: 'process.steps.full_visibility.partnership',
    },
    {
      key: 'payment_options',
      titleKey: 'process.steps.payment_options.title',
      descriptionKey: 'process.steps.payment_options.description',
      considerationsKey: 'process.steps.payment_options.considerations',
      pointsKey: 'process.steps.payment_options.points',
      footerKey: 'process.steps.payment_options.footer',
    },
  ];

  return (
    <section
      id='process'
      ref={sectionRef}
      className='py-20 px-4 relative overflow-hidden'
    >
      {/* Background Image with Overlay */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/ren-2.png'
          alt='Process Background'
          fill
          className='object-cover opacity-10'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80' />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header */}
        <div ref={headerRef} className='text-center mb-16'>
          <H2 className='font-black text-3xl md:text-4xl lg:text-5xl mb-4'>
            {t('process.header')}
          </H2>
          <Separator className='w-24 mx-auto h-1 bg-purple-600' />
        </div>

        {/* Process Cards */}
        <div ref={cardsRef} className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {processSteps.map((step, index) => (
            <div
              key={`${step.key}-${i18n.language}`}
              className='process-card bg-white rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              {/* Step Number */}
              <div className='bg-purple-600 text-white font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center mb-4'>
                {index + 1}
              </div>

              {/* Title */}
              <H3 className='font-bold text-xl md:text-2xl mb-4 text-gray-900'>
                {t(step.titleKey)}
              </H3>

              {/* Description */}
              <P className='text-base md:text-lg text-gray-700 mb-4'>
                {t(step.descriptionKey)}
              </P>

              {/* Points (if exists) */}
              {step.pointsKey && (
                <ul className='space-y-2 mb-4'>
                  {(t(step.pointsKey, { returnObjects: true }) as string[]).map(
                    (point, idx) => (
                      <li
                        key={idx}
                        className='flex items-start gap-2 text-gray-700'
                      >
                        <span className='text-purple-600 font-bold'>→</span>
                        <P className='text-sm md:text-base mt-0!'>{point}</P>
                      </li>
                    )
                  )}
                </ul>
              )}

              {/* Additional Details */}
              {step.detailsKey && (
                <P className='text-sm md:text-base text-gray-600 mt-4 pt-4 border-t border-gray-200'>
                  {t(step.detailsKey)}
                </P>
              )}

              {/* Partnership Text */}
              {step.partnershipKey && (
                <P className='text-sm md:text-base text-gray-600 mt-4 pt-4 border-t border-gray-200 italic'>
                  {t(step.partnershipKey)}
                </P>
              )}

              {/* Considerations */}
              {step.considerationsKey && (
                <P className='text-sm md:text-base text-gray-800 font-semibold mt-4'>
                  {t(step.considerationsKey)}
                </P>
              )}

              {/* Footer */}
              {step.footerKey && (
                <P className='text-sm md:text-base text-purple-700 font-bold mt-4'>
                  {t(step.footerKey)}
                </P>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
