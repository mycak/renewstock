'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, H3, P } from '@/components/ui/typography';

gsap.registerPlugin(ScrollTrigger);

export const InventorySolutionsSection: React.FC = () => {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    gsap.set([content, image], { autoAlpha: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(content, {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }).from(
      image,
      {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.6'
    );

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
        <div className='mb-12 text-center'>
          <P className='text-sm font-semibold tracking-wider text-purple-600 uppercase mb-4'>
            {t('inventory_solutions.eyebrow')}
          </P>
          <H2 className='font-black text-4xl md:text-5xl lg:text-6xl mb-6'>
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
                <P className='text-gray-600 leading-relaxed mt-0!'>
                  {t('inventory_solutions.solutions.0.content.text')}
                </P>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Single Card */}
        <div className='lg:hidden'>
          <div className='relative rounded-2xl overflow-hidden bg-white shadow-lg'>
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
