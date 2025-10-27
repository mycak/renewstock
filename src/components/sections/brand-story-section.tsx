'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { H2, H3, P } from '@/components/ui/typography';
import {
  createScrollTimeline,
  cleanupScrollTriggers,
} from '@/lib/gsap-animations';

export const BrandStorySection: React.FC = () => {
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

    // Animate benefit items with stagger
    const benefitItems = content.querySelectorAll('.benefit-item');
    if (benefitItems.length > 0) {
      tl.from(
        benefitItems,
        {
          y: 20,
          autoAlpha: 0,
          stagger: 0.1,
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
      id='brand-story'
      ref={sectionRef}
      className='py-20 px-4 bg-white overflow-hidden'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Image - Left Side */}
          <div ref={imageRef} className='relative h-[400px] lg:h-[600px]'>
            <Image
              src='/images/ren-1.png'
              alt='RenewStock Brand Story'
              fill
              className='object-cover rounded-lg shadow-lg'
              sizes='(max-width: 1024px) 100vw, 50vw'
              priority
            />
          </div>

          {/* Content - Right Side */}
          <div ref={contentRef} className='space-y-8'>
            <div>
              <H2 className='font-black text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight'>
                {t('brand_story.header')}
              </H2>

              <div className='space-y-4'>
                <P className='text-lg md:text-xl text-gray-600'>
                  {t('brand_story.story.past')}
                </P>
                <P className='text-lg md:text-xl font-bold text-gray-900'>
                  {t('brand_story.story.now')}
                </P>
              </div>
            </div>

            {/* Opportunity Section */}
            <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-6 md:p-8 rounded-lg'>
              <H3 className='font-black text-xl md:text-2xl mb-4 text-gray-900'>
                {t('brand_story.opportunity.header')}
              </H3>

              <P className='text-base md:text-lg font-semibold mb-4 text-gray-800'>
                {t('brand_story.opportunity.tagline')}
              </P>

              <ul className='space-y-2 mb-6'>
                {(
                  t('brand_story.opportunity.benefits', {
                    returnObjects: true,
                  }) as string[]
                ).map((benefit, index) => (
                  <li
                    key={index}
                    className='benefit-item flex items-start gap-3 text-gray-700'
                  >
                    <span className='text-purple-600 font-bold text-lg'>•</span>
                    <P className='text-base md:text-lg !mt-0'>{benefit}</P>
                  </li>
                ))}
              </ul>

              <P className='text-sm md:text-base font-medium text-gray-800 italic'>
                {t('brand_story.opportunity.footer')}
              </P>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
