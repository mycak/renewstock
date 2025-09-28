'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    (header as HTMLElement).removeAttribute('aria-label');
    (header as HTMLElement).removeAttribute('aria-hidden');
    headerSplit.words.forEach((word: Element) => {
      word.removeAttribute('aria-label');
      word.removeAttribute('aria-hidden');
    });

    // Animate header words
    tl.from(headerSplit.words, {
      duration: 0.7,
      y: 100,
      autoAlpha: 0,
      stagger: 0.07,
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
      // Animate region appearance
      tl.from(
        element,
        {
          duration: 0.7,
          autoAlpha: 0,
          y: 30,
          ease: 'power2.out',
        },
        `-=${0.6}`
      ); // Overlap with previous animation

      // Animate underline after region appears
      const underline = element.querySelector('.region-underline');
      if (underline) {
        tl.from(
          underline,
          {
            duration: 0.7,
            scaleX: 0,
            transformOrigin: 'left',
            ease: 'power2.out',
          },
          '-=0.4'
        ); // Start slightly before region animation ends
      }
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
    <section ref={sectionRef} className='relative py-20 px-4 overflow-hidden'>
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
          <div className='absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent'></div>
          {/* Right edge fade */}
          <div className='absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent'></div>
          {/* Top edge fade */}
          <div className='absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent'></div>
          {/* Bottom edge fade */}
          <div className='absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent'></div>
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
        <div ref={regionsRef} className='grid gap-4 max-w-2xl mx-auto'>
          {regions.map((region, index) => (
            <div
              key={index}
              className='region-item text-center bg-transparent backdrop-blur-sm rounded-lg p-4 border border-black'
            >
              <H3 className='font-bold text-xl md:text-2xl mb-2 text-gray-800 relative inline-block border-none'>
                {t(region.title)}
                {/* Purple underline from 30% to 100% width */}
                <div className='region-underline absolute bottom-0 left-[-3%] right-[-3%] h-[2px] bg-purple-500'></div>
              </H3>
              <P className='text-gray-700 leading-relaxed mt-0!'>
                {t(region.description)}
              </P>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
