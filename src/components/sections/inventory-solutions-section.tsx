'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, H3, P } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const InventorySolutionsSection: React.FC = () => {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const cards = content.querySelectorAll('.solution-card');

    // Set initial visibility to prevent blur
    gsap.set([content, image, cards], { autoAlpha: 1 });

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

    tl.from(
      cards,
      {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
      },
      '-=0.4'
    );

    // Ensure final position is set after animation
    tl.set(cards, { clearProps: 'all' });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const solutions = [
    {
      image: '/images/stock-1.jpg',
    },
    {
      image: '/images/stock-12.jpg',
    },
    {
      image: '/images/stock-11.jpg',
    },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSolutionClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? solutions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === solutions.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section
      id='inventory-solutions'
      ref={sectionRef}
      className='py-20 px-4 bg-gradient-to-br from-purple-50/50 via-purple-100/30 to-purple-50/50 overflow-hidden'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Section Header - Mobile only */}
        <div className='mb-8 text-center lg:hidden'>
          <P className='text-sm font-semibold tracking-wider text-purple-600 uppercase mb-0'>
            {t('inventory_solutions.eyebrow')}
          </P>
          <H2 className='font-black text-2xl md:text-4xl mb-6 leading-tight mt-0!'>
            {t('inventory_solutions.header')}
          </H2>
        </div>

        {/* Desktop: Side-by-side layout */}
        <div className='hidden lg:grid grid-cols-2 gap-12 items-start'>
          {/* Left Content */}
          <div ref={contentRef}>
            {/* Section Header - Desktop */}
            <div className='mb-8'>
              <P className='text-sm font-semibold tracking-wider text-purple-600 uppercase mb-0'>
                {t('inventory_solutions.eyebrow')}
              </P>
              <H2 className='font-black text-2xl md:text-4xl mb-6 leading-tight mt-0!'>
                {t('inventory_solutions.header')}
              </H2>
            </div>

            <div className='space-y-4 mb-8'>
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  onClick={() => handleSolutionClick(index)}
                  className={`solution-card w-full text-left p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                    activeIndex === index
                      ? 'border-l-4 border-purple-600 pl-6 bg-white shadow-md'
                      : 'border-l-4 border-transparent pl-6 hover:bg-white/70 hover:shadow-sm'
                  }`}
                >
                  <H3
                    className={`font-bold text-lg md:text-xl mb-2 border-none ${
                      activeIndex === index ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {t(`inventory_solutions.solutions.${index}.title`)}
                  </H3>
                  <P className='text-gray-600 leading-relaxed text-sm md:text-base mt-0!'>
                    {t(`inventory_solutions.solutions.${index}.description`)}
                  </P>
                </div>
              ))}
            </div>

            {/* Call to Action Button */}
            <div>
              <Button
                onClick={scrollToContact}
                size='lg'
                className='bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'
              >
                {t('inventory_solutions.cta')}
              </Button>
            </div>
          </div>

          {/* Right Image with Overlay Card */}
          <div ref={imageRef} className='relative'>
            <div className='relative rounded-2xl overflow-hidden bg-gray-200 shadow-lg'>
              <div className='relative h-[400px] md:h-[500px]'>
                <Image
                  src={solutions[activeIndex].image}
                  alt={t(`inventory_solutions.solutions.${activeIndex}.title`)}
                  fill
                  className='object-cover transition-opacity duration-500'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              </div>

              {/* Floating Card Overlay */}
              <div className='bg-white p-6 rounded-b-2xl'>
                <H3 className='font-bold text-xl md:text-2xl text-gray-900 mb-3 border-none'>
                  {t(
                    `inventory_solutions.solutions.${activeIndex}.content.heading`
                  )}
                </H3>
                <P className='text-gray-600 leading-relaxed mt-0!'>
                  {t(
                    `inventory_solutions.solutions.${activeIndex}.content.text`
                  )}
                </P>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Carousel layout */}
        <div className='lg:hidden'>
          <div
            ref={carouselRef}
            className='relative'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carousel Item */}
            <div className='relative rounded-2xl overflow-hidden bg-gray-200 shadow-lg mb-6'>
              <div className='relative h-[300px] sm:h-[350px]'>
                <Image
                  src={solutions[activeIndex].image}
                  alt={t(`inventory_solutions.solutions.${activeIndex}.title`)}
                  fill
                  className='object-cover transition-all duration-500'
                  sizes='100vw'
                />
              </div>

              {/* Content Card */}
              <div className='bg-white p-6'>
                <H3 className='font-bold text-xl text-gray-900 mb-3 border-none'>
                  {t(`inventory_solutions.solutions.${activeIndex}.title`)}
                </H3>
                <P className='text-gray-600 leading-relaxed mb-4 mt-0!'>
                  {t(
                    `inventory_solutions.solutions.${activeIndex}.description`
                  )}
                </P>
                <div className='border-t pt-4 mt-4'>
                  <H3 className='font-semibold text-lg text-gray-900 mb-2 border-none'>
                    {t(
                      `inventory_solutions.solutions.${activeIndex}.content.heading`
                    )}
                  </H3>
                  <P className='text-gray-600 text-sm leading-relaxed mt-0!'>
                    {t(
                      `inventory_solutions.solutions.${activeIndex}.content.text`
                    )}
                  </P>
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className='flex items-center justify-between mb-6'>
              <button
                onClick={handlePrevious}
                className='p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95'
                aria-label='Previous solution'
              >
                <ChevronLeft className='w-6 h-6 text-purple-600' />
              </button>

              {/* Dots Indicator */}
              <div className='flex gap-2'>
                {solutions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'w-8 bg-purple-600'
                        : 'w-2 bg-gray-300'
                    }`}
                    aria-label={`Go to solution ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className='p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95'
                aria-label='Next solution'
              >
                <ChevronRight className='w-6 h-6 text-purple-600' />
              </button>
            </div>

            {/* Call to Action Button */}
            <div className='text-center'>
              <Button
                onClick={scrollToContact}
                size='lg'
                className='bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer w-full sm:w-auto'
              >
                {t('inventory_solutions.cta')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
