'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, H3, P } from '@/components/ui/typography';

gsap.registerPlugin(ScrollTrigger);

export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    // Set initial visibility to 1 to prevent blur
    gsap.set(cards.querySelectorAll('.testimonial-card'), {
      autoAlpha: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(header, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    const testimonialCards = cards.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
      tl.from(
        testimonialCards,
        {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const testimonials = [
    {
      image: '/images/stock-6.jpg',
      rating: 5,
    },
    {
      image: '/images/stock-7.jpg',
      rating: 5,
    },
    {
      image: '/images/stock-8.jpg',
      rating: 5,
    },
  ];

  return (
    <section
      id='testimonials'
      ref={sectionRef}
      className='py-20 px-4 bg-white relative overflow-hidden'
    >
      {/* Background decorative elements */}
      <div className='absolute top-0 left-0 w-full h-full opacity-5'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl' />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header */}
        <div ref={headerRef} className='text-center mb-4'>
          <P className='text-sm font-semibold tracking-wider text-purple-600 uppercase mb-4'>
            {t('testimonials.eyebrow')}
          </P>
          <H2 className='font-black text-4xl md:text-5xl lg:text-6xl mb-6'>
            {t('testimonials.header')}
          </H2>
          <P className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
            {t('testimonials.description')}
          </P>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={cardsRef}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch'
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='testimonial-card bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col'
            >
              {/* Rating Stars */}
              <div className='flex gap-1 mb-6'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className='w-5 h-5 text-purple-600'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <P className='text-gray-700 italic mb-6 text-base leading-relaxed flex-grow'>
                &ldquo;{t(`testimonials.items.${index}.quote`)}&rdquo;
              </P>

              {/* Author Info */}
              <div className='flex items-center gap-4 pt-6 border-t border-gray-200 mt-auto'>
                <div className='relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0'>
                  <Image
                    src={testimonial.image}
                    alt={t(`testimonials.items.${index}.author`)}
                    fill
                    className='object-cover'
                    sizes='56px'
                  />
                </div>
                <div>
                  <H3 className='font-bold text-lg text-gray-900 border-none mb-1'>
                    {t(`testimonials.items.${index}.author`)}
                  </H3>
                  <P className='text-sm text-gray-600 leading-tight mt-0!'>
                    {t(`testimonials.items.${index}.position`)}
                  </P>
                  <P className='text-sm font-semibold text-purple-600 mt-0!'>
                    {t(`testimonials.items.${index}.company`)}
                  </P>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='mt-16 text-center'>
          <div className='inline-block bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 shadow-xl'>
            <H3 className='font-bold text-2xl md:text-3xl text-white mb-4 border-none'>
              {t('testimonials.cta.header')}
            </H3>
            <P className='text-white/90 text-lg mb-6 max-w-2xl mx-auto'>
              {t('testimonials.cta.description')}
            </P>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300'>
                {t('testimonials.cta.primary')}
              </button>
              <button className='bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300'>
                {t('testimonials.cta.secondary')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
