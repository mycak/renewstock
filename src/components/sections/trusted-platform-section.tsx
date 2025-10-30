'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, H3, P } from '@/components/ui/typography';

gsap.registerPlugin(ScrollTrigger);

export const TrustedPlatformSection: React.FC = () => {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stats = statsRef.current;

    if (!section || !header || !stats) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(header, {
      y: 40,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    const statCards = stats.querySelectorAll('.stat-card');
    tl.from(
      statCards,
      {
        y: 60,
        autoAlpha: 0,
        scale: 0.9,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.2)',
      },
      '-=0.4'
    );

    // Animate numbers counting up
    statCards.forEach((card) => {
      const numberElement = card.querySelector('.stat-number');
      if (numberElement) {
        const finalValue = numberElement.textContent || '';

        gsap.from(numberElement, {
          textContent: 0,
          duration: 2,
          ease: 'power1.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
          onUpdate: function () {
            const currentValue = Math.floor(
              parseFloat(this.targets()[0].textContent)
            );
            if (finalValue.includes('K')) {
              this.targets()[0].textContent = currentValue + 'K+';
            } else if (finalValue.includes('B')) {
              this.targets()[0].textContent = '$' + currentValue + 'B+';
            } else {
              this.targets()[0].textContent = currentValue + '+';
            }
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const stats = [
    {
      valueKey: 'trusted_platform.stats.listings.value',
      labelKey: 'trusted_platform.stats.listings.label',
      descriptionKey: 'trusted_platform.stats.listings.description',
    },
    {
      valueKey: 'trusted_platform.stats.msrp.value',
      labelKey: 'trusted_platform.stats.msrp.label',
      descriptionKey: 'trusted_platform.stats.msrp.description',
    },
    {
      valueKey: 'trusted_platform.stats.brands.value',
      labelKey: 'trusted_platform.stats.brands.label',
      descriptionKey: 'trusted_platform.stats.brands.description',
    },
  ];

  return (
    <section
      id='trusted-platform'
      ref={sectionRef}
      className='py-24 px-4 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden'
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]' />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header */}
        <div ref={headerRef} className='text-center mb-16'>
          <H2 className='font-black text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight max-w-5xl mx-auto'>
            {t('trusted_platform.header')}
          </H2>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'
        >
          {stats.map((stat, index) => (
            <div key={index} className='stat-card text-center'>
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 h-full flex flex-col'>
                <H3 className='stat-number font-black text-5xl md:text-6xl lg:text-7xl text-white mb-4 border-none'>
                  {t(stat.valueKey)}
                </H3>
                <P className='text-xl md:text-2xl font-bold text-white/90 mb-3 mt-0!'>
                  {t(stat.labelKey)}
                </P>
                <P className='text-sm md:text-base text-white/70 leading-relaxed mt-0! min-h-[3rem]'>
                  {t(stat.descriptionKey)}
                </P>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
