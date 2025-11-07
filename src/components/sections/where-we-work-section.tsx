'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cleanupSplitTextAria } from '@/lib/gsap-utils';
import { H2, P } from '@/components/ui/typography';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

export const WhereWeWorkSection: React.FC = () => {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const imageContainer = imageContainerRef.current;
    const textOverlay = textOverlayRef.current;

    if (!section || !header || !imageContainer || !textOverlay) return;

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate eyebrow and header
    const eyebrow = header.querySelector('.eyebrow-text');
    const headerTitle = header.querySelector('.header-title');

    if (eyebrow) {
      tl.from(eyebrow, {
        duration: 0.6,
        y: 30,
        opacity: 0,
        ease: 'power2.out',
      });
    }

    if (headerTitle) {
      const headerSplit = SplitText.create(headerTitle, {
        type: 'words',
        wordsClass: 'split-word',
        tag: 'span',
      });

      cleanupSplitTextAria(headerTitle as HTMLElement, headerSplit);

      tl.from(
        headerSplit.words,
        {
          duration: 0.6,
          y: 100,
          opacity: 0,
          stagger: 0.05,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }

    // Animate image container with scale and fade
    tl.from(
      imageContainer,
      {
        duration: 1.2,
        scale: 0.8,
        opacity: 0,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    // Animate text overlay
    const overlaySplit = SplitText.create(textOverlay, {
      type: 'chars,words',
      charsClass: 'split-char',
      wordsClass: 'split-word',
      tag: 'span',
    });

    cleanupSplitTextAria(textOverlay as HTMLElement, overlaySplit);

    tl.from(
      overlaySplit.chars,
      {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: -90,
        transformOrigin: '0% 50% -50',
        stagger: 0.02,
        ease: 'back.out(1.7)',
      },
      '-=0.6'
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className='py-20 px-4 bg-gradient-to-b from-gray-50 to-white'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div ref={headerRef} className='text-center mb-16'>
          <P className='eyebrow-text text-sm font-semibold tracking-wider text-purple-600 uppercase mb-4'>
            {t('where_we_work.eyebrow')}
          </P>
          <H2 className='header-title font-black text-4xl md:text-5xl lg:text-6xl mb-6'>
            {t('where_we_work.header')}
          </H2>
          <P className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
            {t('where_we_work.description')}
          </P>
        </div>

        {/* Image Container with Text Overlay */}
        <div
          ref={imageContainerRef}
          className='relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl'
        >
          {/* World Map Image */}
          <Image
            src='/images/worldmap.jpg'
            alt='World Map'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px'
            priority
          />

          {/* Blur Effect on Edges - Smooth gradients */}
          <div className='absolute inset-0 pointer-events-none'>
            {/* Top blur */}
            <div className='absolute top-0 left-0 right-0 h-24 md:h-32 lg:h-40 bg-gradient-to-b from-gray-50 via-gray-50/60 to-transparent'></div>
            {/* Bottom blur */}
            <div className='absolute bottom-0 left-0 right-0 h-24 md:h-32 lg:h-40 bg-gradient-to-t from-gray-50 via-gray-50/60 to-transparent'></div>
            {/* Left blur */}
            <div className='absolute top-0 left-0 bottom-0 w-20 md:w-32 lg:w-40 bg-gradient-to-r from-gray-50 via-gray-50/60 to-transparent'></div>
            {/* Right blur */}
            <div className='absolute top-0 right-0 bottom-0 w-20 md:w-32 lg:w-40 bg-gradient-to-l from-gray-50 via-gray-50/60 to-transparent'></div>
          </div>
        </div>
      </div>
    </section>
  );
};
