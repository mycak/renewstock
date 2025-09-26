'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import { H2, P } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import worldMapAnimation from '../../../public/lottie/world-map.json';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

export const WhereWeWorkSection: React.FC = () => {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const regionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const regions = regionsRef.current;

    if (!section || !header || !regions) return;

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
    });

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

    // Animate regions with opacity fade-in
    const regionElements = regions.querySelectorAll('.region-item');

    regionElements.forEach((element) => {
      tl.from(
        element,
        {
          duration: 0.8,
          autoAlpha: 0,
          y: 30,
          ease: 'power2.out',
        },
        `-=${0.6}`
      ); // Overlap with previous animation
    });

    // Cleanup function
    return () => {
      headerSplit?.revert();
    };
  }, []);

  const regions = [
    {
      key: 'where_we_work.regions.uk',
      title: 'where_we_work.regions.uk.title',
      description: 'where_we_work.regions.uk.description',
    },
    {
      key: 'where_we_work.regions.africa',
      title: 'where_we_work.regions.africa.title',
      description: 'where_we_work.regions.africa.description',
    },
    {
      key: 'where_we_work.regions.balkans',
      title: 'where_we_work.regions.balkans.title',
      description: 'where_we_work.regions.balkans.description',
    },
    {
      key: 'where_we_work.regions.mena',
      title: 'where_we_work.regions.mena.title',
      description: 'where_we_work.regions.mena.description',
    },
    {
      key: 'where_we_work.regions.eastern_europe',
      title: 'where_we_work.regions.eastern_europe.title',
      description: 'where_we_work.regions.eastern_europe.description',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className='relative py-20 px-4 bg-gray-50 overflow-hidden'
    >
      {/* Lottie Background */}
      <div className='absolute inset-0 opacity-20'>
        <Lottie
          animationData={worldMapAnimation}
          loop={true}
          autoplay={true}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-6xl mx-auto text-center'>
        {/* Header */}
        <H2
          ref={headerRef}
          className='font-black text-3xl md:text-3xl tracking-tight border-none'
        >
          {t('where_we_work.header')}
        </H2>

        {/* Separator */}
        <Separator className='separator w-24 mx-auto mb-12 h-1 bg-gray-800' />

        {/* Regions Grid */}
        <div
          ref={regionsRef}
          className='grid gap-8 md:gap-12 max-w-4xl mx-auto'
        >
          {regions.map((region, index) => (
            <div
              key={index}
              className='region-item text-left bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg'
            >
              <h3 className='font-bold text-xl md:text-2xl mb-3 text-gray-800'>
                {t(region.title)}
              </h3>
              <P className='text-gray-700 leading-relaxed'>
                {t(region.description)}
              </P>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
