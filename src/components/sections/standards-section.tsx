'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { H2, P } from '@/components/ui/typography';
import {
  createScrollTimeline,
  cleanupScrollTriggers,
} from '@/lib/gsap-animations';

export const StandardsSection: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    const tl = createScrollTimeline({
      trigger: section,
      start: 'top 70%',
      end: 'bottom 30%',
    });

    // Animate image sliding in from left
    tl.from(image, {
      x: -60,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power2.out',
    });

    // Animate content fading in from right
    tl.from(
      content,
      {
        x: 60,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power2.out',
      },
      '-=0.6'
    );

    // Animate standard points with stagger
    const standardPoints = content.querySelectorAll('.standard-point');
    if (standardPoints.length > 0) {
      tl.from(
        standardPoints,
        {
          y: 20,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    }

    return () => {
      cleanupScrollTriggers(section);
    };
  }, [i18n.language]);

  return (
    <section
      id='standards'
      ref={sectionRef}
      className='py-20 px-4 bg-gray-50 overflow-hidden'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Image - Left Side */}
          <div ref={imageRef} className='relative h-[400px] lg:h-[600px]'>
            <Image
              src='/images/ren-4.png'
              alt='RenewStock Standards and Compliance'
              fill
              className='object-cover rounded-lg shadow-lg'
              sizes='(max-width: 1024px) 100vw, 50vw'
            />
          </div>

          {/* Content - Right Side */}
          <div ref={contentRef} className='space-y-6'>
            <div>
              <H2 className='font-black text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight text-gray-900'>
                {t('standards.header')}
              </H2>

              <P className='text-lg md:text-xl text-gray-700 mb-6'>
                {t('standards.intro')}
              </P>
            </div>

            {/* Standards Grid */}
            <div className='grid grid-cols-1 gap-4'>
              {(t('standards.points', { returnObjects: true }) as string[]).map(
                (point, index) => (
                  <div
                    key={index}
                    className='standard-point bg-white p-4 md:p-6 rounded-lg shadow-sm border-l-4 border-purple-600 hover:shadow-md transition-shadow duration-300'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='flex-shrink-0'>
                        <div className='w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center'>
                          <svg
                            className='w-5 h-5 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                        </div>
                      </div>
                      <P className='text-base md:text-lg font-medium text-gray-800 mt-0!'>
                        {point}
                      </P>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Footer Message */}
            <div className='bg-gradient-to-r from-purple-600 to-purple-800 p-6 md:p-8 rounded-lg mt-8'>
              <P className='text-lg md:text-xl font-bold text-white text-center'>
                {t('standards.footer')}
              </P>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
