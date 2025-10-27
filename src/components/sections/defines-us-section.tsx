'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cleanupSplitTextAria } from '@/lib/gsap-utils';
import { H2 } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

export const DefinesUsSection: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const features = featuresRef.current;

    if (!section || !header || !features) return;

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
      duration: 0.72,
      y: 100,
      autoAlpha: 0,
      stagger: 0.09,
      ease: 'power2.out',
    });

    // Animate separator after header
    const separator = section.querySelector('.separator');
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

    // Split feature text elements - words only
    const featureElements = features.querySelectorAll('.feature-text');
    const featureSplits: SplitText[] = []; // Store references to split instances

    featureElements.forEach((element) => {
      const split = SplitText.create(element, {
        type: 'words',
        wordsClass: 'split-word',
        tag: 'span',
      });

      // Remove any ARIA attributes that SplitText might have added
      (element as HTMLElement).removeAttribute('aria-label');
      (element as HTMLElement).removeAttribute('aria-hidden');
      split.words.forEach((word: Element) => {
        word.removeAttribute('aria-label');
        word.removeAttribute('aria-hidden');
      });

      featureSplits.push(split); // Store the split instance for cleanup

      // Remove any ARIA attributes that SplitText might have added
      cleanupSplitTextAria(element as HTMLElement, split);

      // Apply highlight background to the first word
      const firstSplitWord = split.words[0];
      if (firstSplitWord) {
        gsap.set(firstSplitWord, {
          background: 'linear-gradient(135deg, #c084fc, #a855f7, #d8b4fe)',
          color: '#1f2937',
          padding: '4px 8px',
          borderRadius: '4px',
          display: 'inline-block',
        });
      }

      // Animate each feature's words with stagger - only word appearance
      tl.from(
        split.words,
        {
          duration: 0.72,
          y: 80,
          autoAlpha: 0,
          stagger: 0.225,
          ease: 'power2.out',
        },
        `-=${0.36}`
      ); // Overlap with previous animation
    });

    // Cleanup function
    return () => {
      headerSplit?.revert();
      // Clean up all stored split instances
      featureSplits.forEach((split) => {
        split?.revert();
      });
    };
  }, [t]); // Re-run effect when translations change

  const features = [
    'defines_us.features.real_resale_performance',
    'defines_us.features.end_to_end_control',
    'defines_us.features.no_market_leakage',
    'defines_us.features.elevated_circularity',
    'defines_us.features.we_pay_upfront',
  ];

  return (
    <section id='defines-us' ref={sectionRef} className='py-20 px-4 bg-gray-50'>
      <div className='max-w-6xl mx-auto text-center'>
        {/* Header */}
        <H2
          ref={headerRef}
          className='font-black text-3xl md:text-3xl tracking-tight border-none'
          key={`header-${i18n.language}`}
        >
          {t('defines_us.header')}
        </H2>

        {/* Separator */}
        <Separator className='separator w-24 mx-auto mb-12 h-1 bg-black' />

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className='space-y-4 md:space-y-6'
          key={i18n.language}
        >
          {features.map((featureKey, index) => {
            const featureText = t(featureKey);
            // Split the text to highlight the first word/phrase
            const words = featureText.split(' ');
            const firstWord = words[0];
            const restOfText = words.slice(1).join(' ');

            return (
              <h3
                key={`${featureKey}-${i18n.language}-${index}`}
                className='feature-text font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-2'
              >
                <span className='highlighted-word'>{firstWord}</span>
                {restOfText && <span> {restOfText}</span>}
              </h3>
            );
          })}
        </div>
      </div>
    </section>
  );
};
