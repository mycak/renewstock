'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cleanupSplitTextAria } from '@/lib/gsap-utils';
import { H2, H3, P } from '@/components/ui/typography';

gsap.registerPlugin(SplitText, ScrollTrigger);

export const InventorySolutionsSection: React.FC = () => {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const header = headerRef.current;
    const mobileCard = mobileCardRef.current;

    if (!section || !header) return;

    if (content && image) {
      gsap.set([content, image], { autoAlpha: 1 });
    }
    if (mobileCard) {
      gsap.set(mobileCard, { autoAlpha: 1 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate header elements
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

    // Animate desktop content and image
    if (image && content) {
      tl.from(
        image,
        {
          x: -60,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.2'
      ).from(
        content,
        {
          x: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.6'
      );
    }

    // Animate mobile card
    if (mobileCard) {
      tl.from(
        mobileCard,
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const displayedSolution = {
    image: '/images/stock-1.jpg',
    index: 0,
  };

  return (
    <section
      id='inventory-solutions'
      ref={sectionRef}
      className='py-20 px-4 bg-gradient-to-br from-purple-50/50 via-purple-100/30 to-purple-50/50 overflow-hidden'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div ref={headerRef} className='mb-12 text-center'>
          <P className='eyebrow-text text-sm font-semibold tracking-wider text-purple-500 uppercase mb-4'>
            {t('inventory_solutions.eyebrow')}
          </P>
          <H2 className='header-title font-black text-4xl md:text-5xl lg:text-6xl mb-6'>
            {t('inventory_solutions.header')}
          </H2>
        </div>

        {/* Desktop: Side-by-side layout */}
        <div className='hidden lg:grid grid-cols-[60%_40%] gap-16 items-stretch'>
          {/* Left Image */}
          <div ref={imageRef}>
            <div className='relative rounded-2xl overflow-hidden bg-gray-200 shadow-xl h-full'>
              <div className='relative h-[600px]'>
                <Image
                  src={displayedSolution.image}
                  alt={t(
                    `inventory_solutions.solutions.${displayedSolution.index}.title`
                  )}
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 60vw'
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Content - Single Text Card */}
          <div ref={contentRef} className='flex'>
            <div className='bg-white p-8 rounded-xl shadow-md flex flex-col justify-center h-full'>
              <H3 className='font-bold text-2xl text-gray-900 mb-4 border-none'>
                {t('inventory_solutions.solutions.0.title')}
              </H3>
              <P className='text-gray-700 leading-relaxed text-base mb-6 mt-0!'>
                {t('inventory_solutions.solutions.0.description')}
              </P>
              <div className='border-t pt-6'>
                <H3 className='font-semibold text-xl text-gray-900 mb-3 border-none'>
                  {t('inventory_solutions.solutions.0.content.heading')}
                </H3>
                <P className='text-gray-600 leading-relaxed mb-6 mt-0!'>
                  {t('inventory_solutions.solutions.0.content.text')}
                </P>

                {/* Icons row at bottom */}
                <div className='flex justify-center gap-6 pt-4'>
                  {/* Icon 1 - Shield with checkmark */}
                  <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300'>
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                      />
                    </svg>
                  </div>

                  {/* Icon 2 - Trending up */}
                  <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300'>
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      />
                    </svg>
                  </div>

                  {/* Icon 3 - Globe */}
                  <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300'>
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Single Card */}
        <div className='lg:hidden'>
          <div
            ref={mobileCardRef}
            className='relative rounded-2xl overflow-hidden bg-white shadow-lg'
          >
            <div className='relative h-[400px]'>
              <Image
                src={displayedSolution.image}
                alt={t(
                  `inventory_solutions.solutions.${displayedSolution.index}.title`
                )}
                fill
                className='object-cover'
                sizes='100vw'
                priority
              />
            </div>

            {/* Content Card */}
            <div className='p-6'>
              <H3 className='font-bold text-xl text-gray-900 mb-3 border-none'>
                {t('inventory_solutions.solutions.0.title')}
              </H3>
              <P className='text-gray-600 leading-relaxed mb-4 mt-0!'>
                {t('inventory_solutions.solutions.0.description')}
              </P>
              <div className='border-t pt-4 mt-4'>
                <H3 className='font-semibold text-lg text-gray-900 mb-3 border-none'>
                  {t('inventory_solutions.solutions.0.content.heading')}
                </H3>
                <P className='text-gray-700 leading-relaxed mt-0!'>
                  {t('inventory_solutions.solutions.0.content.text')}
                </P>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
