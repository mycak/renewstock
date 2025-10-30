'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cleanupSplitTextAria } from '@/lib/gsap-utils';
import Lottie from 'lottie-react';
import { H2, P, H3 } from '@/components/ui/typography';
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

    // Get region elements
    const regionElements = regions.querySelectorAll('.region-item');
    const separator = section.querySelector('.separator');

    // Set initial states to ensure visibility
    gsap.set(regionElements, { autoAlpha: 1, y: 0 });
    if (separator) {
      gsap.set(separator, { scaleX: 1 });
    }

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none none',
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
      duration: 0.63,
      y: 100,
      autoAlpha: 0,
      stagger: 0.063,
      ease: 'power2.out',
    });

    // Animate separator after header
    if (separator) {
      tl.from(
        separator,
        {
          duration: 0.54,
          scaleX: 0,
          transformOrigin: 'center',
          ease: 'power2.out',
        },
        '-=0.18'
      );
    }

    // Animate regions with opacity fade-in
    regionElements.forEach((element) => {
      // Animate region appearance
      tl.from(
        element,
        {
          duration: 0.63,
          autoAlpha: 0,
          y: 30,
          ease: 'power2.out',
        },
        `-=${0.54}`
      ); // Overlap with previous animation

      // Animate underline after region appears
      const underline = element.querySelector('.region-underline');
      if (underline) {
        tl.from(
          underline,
          {
            duration: 0.63,
            scaleX: 0,
            transformOrigin: 'left',
            ease: 'power2.out',
          },
          '-=0.36'
        ); // Start slightly before region animation ends
      }
    });

    // Cleanup function
    return () => {
      headerSplit?.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
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
    <section ref={sectionRef} className='relative py-20 px-4 overflow-hidden'>
      {/* Background Layer */}
      <div className='absolute inset-0 bg-gradient-to-b from-purple-50/40 via-purple-50/20 to-white'></div>

      {/* Lottie Background with Edge Fade Effect */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='relative w-4/5 md:w-[100vw] lg:w-[80vw] max-w-[1300px] h-full'>
          <Lottie
            animationData={worldMapAnimation}
            loop={true}
            autoplay={true}
            className='w-full h-full object-contain opacity-20'
          />
          {/* Left edge fade */}
          <div className='absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-transparent to-transparent'></div>
          {/* Right edge fade */}
          <div className='absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-transparent via-transparent to-transparent'></div>
          {/* Top edge fade */}
          <div className='absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-transparent to-transparent'></div>
          {/* Bottom edge fade */}
          <div className='absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-transparent via-transparent to-transparent'></div>
        </div>
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
          className='grid gap-6 grid-cols-1 md:grid-cols-6 max-w-6xl mx-auto'
        >
          {regions.map((region, index) => (
            <div
              key={index}
              className={`region-item text-center rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl col-span-1 md:col-span-2 bg-gradient-to-br from-purple-50/40 to-violet-100/60 border-2 border-purple-400 shadow-lg shadow-purple-200/50 ${
                index === 3
                  ? 'md:[grid-column-start:2]'
                  : index === 4
                  ? 'md:[grid-column-start:4]'
                  : ''
              }`}
            >
              <H3 className='font-bold text-xl md:text-2xl mb-2 text-purple-900 relative inline-block border-none'>
                {t(region.title)}
                <div className='region-underline absolute bottom-0 left-[-3%] right-[-3%] h-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-purple-500'></div>
              </H3>
              <P className='text-purple-800 leading-relaxed mt-0!'>
                {t(region.description)}
              </P>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
