'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslate } from '@tolgee/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, H3, P } from '@/components/ui/typography';

gsap.registerPlugin(ScrollTrigger);

export const TrustedPlatformSection: React.FC = () => {
  const { t } = useTranslate();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stats = statsRef.current;

    if (!section || !header || !stats) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: isMobile ? 'top 80%' : 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
        },
      });

      animationsRef.current = tl;
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger);
      }

      tl.from(header, {
        y: isMobile ? window.innerHeight * 0.3 : 40,
        autoAlpha: 0,
        duration: isMobile ? 1 : 0.8,
        ease: 'power2.out',
      });

      const statCards = stats.querySelectorAll('.stat-card');
      tl.from(
        statCards,
        {
          y: isMobile ? window.innerHeight * 0.4 : 60,
          autoAlpha: 0,
          scale: isMobile ? 0.85 : 0.9,
          stagger: isMobile ? 0.15 : 0.2,
          duration: isMobile ? 1 : 0.8,
          ease: 'back.out(1.2)',
        },
        '-=0.4'
      );

      statCards.forEach((card) => {
        const numberElement = card.querySelector('.stat-number');
        if (numberElement) {
          const finalValue = numberElement.textContent || '';

          const st = ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            onEnter: () => {
              gsap.from(numberElement, {
                textContent: 0,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
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
            },
            once: true,
          });
          scrollTriggersRef.current.push(st);
        }
      });
    }, section);

    return () => {
      ctx.revert();
      scrollTriggersRef.current.forEach((st) => st.kill());
      scrollTriggersRef.current = [];
      animationsRef.current = null;
    };
  }, []);

  const stats = [
    {
      value: t('trusted_platform.stats.listings.value'),
      label: t('trusted_platform.stats.listings.label'),
      description: t('trusted_platform.stats.listings.description'),
    },
    {
      value: t('trusted_platform.stats.msrp.value'),
      label: t('trusted_platform.stats.msrp.label'),
      description: t('trusted_platform.stats.msrp.description'),
    },
    {
      value: t('trusted_platform.stats.brands.value'),
      label: t('trusted_platform.stats.brands.label'),
      description: t('trusted_platform.stats.brands.description'),
    },
  ];

  return (
    <section
      id='trusted-platform'
      ref={sectionRef}
      className='py-8 md:py-24 px-4 bg-[#7E5BB5] relative overflow-hidden'
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
              <div className='bg-[#6a4a9e]/70 backdrop-blur-sm rounded-2xl p-8 hover:bg-[#6a4a9e] transition-all duration-300 h-full flex flex-col'>
                <H3 className='stat-number font-black text-5xl md:text-6xl lg:text-7xl text-white mb-4 border-none'>
                  {stat.value}
                </H3>
                <P className='text-xl md:text-2xl font-bold text-white/90 mb-3 mt-0!'>
                  {stat.label}
                </P>
                <P className='text-sm md:text-base text-white/70 leading-relaxed mt-0! min-h-12'>
                  {stat.description}
                </P>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
