'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { H2, H3, P } from '@/components/ui/typography';
import {
  createScrollTimeline,
  cleanupScrollTriggers,
} from '@/lib/gsap-animations';

export const PartnershipSection: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const tl = createScrollTimeline({
      trigger: section,
      start: 'top 70%',
      end: 'bottom 30%',
    });

    // Animate content sliding in from left
    tl.from(content, {
      x: -60,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power2.out',
    });

    // Animate image fading in
    tl.from(
      image,
      {
        autoAlpha: 0,
        scale: 0.95,
        duration: 0.9,
        ease: 'power2.out',
      },
      '-=0.6'
    );

    return () => {
      cleanupScrollTriggers(section);
    };
  }, [i18n.language]);

  return (
    <section
      id='partnership'
      ref={sectionRef}
      className='py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-purple-50 overflow-hidden'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Content - Left Side */}
          <div ref={contentRef} className='space-y-6'>
            <div className='space-y-4'>
              <P className='text-sm font-semibold tracking-wider text-purple-500 uppercase mb-0! md:mb-4'>
                {t('partnership.subheader')}
              </P>
              <H2 className='font-black text-4xl md:text-4xl lg:text-5xl mb-6'>
                {t('partnership.header')}
              </H2>
            </div>

            <div className='bg-white p-6 md:p-8 rounded-lg shadow-md border-l-4 border-purple-600'>
              <div className='space-y-4'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-6 h-6 text-white'
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
                  <div>
                    <H3 className='font-bold text-lg md:text-xl text-gray-900 mb-0'>
                      {t('partnership.benefits.active_partnership.title')}
                    </H3>
                    <P className='text-gray-700 text-base md:text-lg mt-0!'>
                      {t('partnership.benefits.active_partnership.description')}
                    </P>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-6 h-6 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <div>
                    <H3 className='font-bold text-lg md:text-xl text-gray-900 mb-0'>
                      {t('partnership.benefits.full_accountability.title')}
                    </H3>
                    <P className='text-gray-700 text-base md:text-lg mt-0!'>
                      {t(
                        'partnership.benefits.full_accountability.description'
                      )}
                    </P>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-6 h-6 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      />
                    </svg>
                  </div>
                  <div>
                    <H3 className='font-bold text-lg md:text-xl text-gray-900 mb-0'>
                      {t('partnership.benefits.long_term_growth.title')}
                    </H3>
                    <P className='text-gray-700 text-base md:text-lg mt-0!'>
                      {t('partnership.benefits.long_term_growth.description')}
                    </P>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image - Left Side */}
          <div
            ref={imageRef}
            className='hidden lg:block relative h-[400px] lg:h-[600px]'
          >
            <Image
              src='/images/stock-7.jpg'
              alt='Partnership Commitment'
              fill
              className='object-cover rounded-lg shadow-xl'
              sizes='(max-width: 1024px) 100vw, 50vw'
            />
          </div>
        </div>
      </div>
    </section>
  );
};
