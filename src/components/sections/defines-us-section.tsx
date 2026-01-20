'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslate, useTolgee } from '@tolgee/react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cleanupSplitTextAria } from '@/lib/gsap-utils';
import { H2 } from '@/components/ui/typography';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

export const DefinesUsSection: React.FC = () => {
  const { t } = useTranslate();
  const tolgee = useTolgee(['language']);
  const currentLanguage = tolgee.getLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const features = featuresRef.current;

    if (!section || !header || !features) return;

    const isMobile = window.innerWidth < 768;
    let headerSplit: SplitText | null = null;
    const featureSplits: SplitText[] = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: isMobile ? 'top 80%' : 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
        },
      });

      headerSplit = SplitText.create(header, {
        type: 'words',
        wordsClass: 'split-word',
        tag: 'span',
      });

      cleanupSplitTextAria(header as HTMLElement, headerSplit);

      tl.from(headerSplit.words, {
        duration: isMobile ? 0.7 : 0.5,
        y: isMobile ? window.innerHeight * 0.15 : 100,
        autoAlpha: 0,
        stagger: isMobile ? 0.05 : 0.07,
        ease: 'power2.out',
      });

      const separator = section.querySelector('.separator');
      if (separator) {
        tl.from(
          separator,
          {
            duration: 0.45,
            scaleX: 0,
            transformOrigin: 'center',
            ease: 'power2.out',
          },
          '-=0.18'
        );
      }

      const featureElements = features.querySelectorAll('.feature-text');

      featureElements.forEach((element) => {
        const split = SplitText.create(element, {
          type: 'words',
          wordsClass: 'split-word',
          tag: 'span',
        });

        (element as HTMLElement).removeAttribute('aria-label');
        (element as HTMLElement).removeAttribute('aria-hidden');
        split.words.forEach((word: Element) => {
          word.removeAttribute('aria-label');
          word.removeAttribute('aria-hidden');
        });

        featureSplits.push(split);

        cleanupSplitTextAria(element as HTMLElement, split);

        const firstSplitWord = split.words[0];
        if (firstSplitWord) {
          gsap.set(firstSplitWord, {
            background: '#7E5BB5',
            color: '#ffffff',
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'inline-block',
          });
        }

        tl.from(
          split.words,
          {
            duration: isMobile ? 0.8 : 0.6,
            y: isMobile ? window.innerHeight * 0.12 : 80,
            autoAlpha: 0,
            stagger: isMobile ? 0.12 : 0.175,
            ease: 'power2.out',
          },
          `-=${0.36}`
        );
      });
    }, section);

    return () => {
      ctx.revert();
      headerSplit?.revert();
      featureSplits.forEach((split) => split?.revert());
    };
  }, [currentLanguage]);

  const features = [
    t('defines_us.features.real_resale_performance'),
    t('defines_us.features.end_to_end_control'),
    t('defines_us.features.no_market_leakage'),
    t('defines_us.features.elevated_circularity'),
    t('defines_us.features.we_pay_upfront'),
  ];

  return (
    <section id='defines-us' ref={sectionRef} className='py-8 md:py-20 px-4 bg-gray-50'>
      <div className='max-w-6xl mx-auto text-center'>
        {/* Header */}
        <H2
          ref={headerRef}
          className='font-black text-3xl md:text-3xl tracking-tight border-none'
          key={`header-${currentLanguage}`}
        >
          {t('defines_us.header')}
        </H2>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className='space-y-4 md:space-y-6'
          key={currentLanguage}
        >
          {features.map((featureText, index) => {
            const words = featureText.split(' ');
            const firstWord = words[0];
            const restOfText = words.slice(1).join(' ');

            return (
              <h3
                key={`feature-${currentLanguage}-${index}`}
                className='feature-text font-black text-2xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-2'
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
