'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H3, P } from '@/components/ui/typography';

gsap.registerPlugin(ScrollTrigger);

export const ImageCardsSection: React.FC = () => {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    // Set initial state to visible
    gsap.set(cards.querySelectorAll('.image-card'), {
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

    const cardElements = cards.querySelectorAll('.image-card');

    // Animate each card from different horizontal directions with smoother motion
    cardElements.forEach((card, index) => {
      const direction = index === 0 ? -80 : index === 1 ? 0 : 80; // left, center, right - reduced distance
      const yOffset = index === 1 ? 30 : 15; // center card moves slightly more vertical

      tl.from(
        card,
        {
          x: direction,
          y: yOffset,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          clearProps: 'all',
        },
        index * 0.12 // slightly faster stagger for smoother feel
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const cards = [
    {
      image: '/images/stock-9.jpg',
      titleKey: 'image_cards.cards.sellers.title',
      descriptionKey: 'image_cards.cards.sellers.description',
      imagePosition: 'center',
    },
    {
      image: '/images/stock-5.jpg',
      titleKey: 'image_cards.cards.buyers.title',
      descriptionKey: 'image_cards.cards.buyers.description',
      imagePosition: 'top',
    },
    {
      image: '/images/stock-10.jpg',
      titleKey: 'image_cards.cards.distribution.title',
      descriptionKey: 'image_cards.cards.distribution.description',
      imagePosition: 'center',
    },
  ];

  return (
    <section
      id='image-cards'
      ref={sectionRef}
      className='py-20 px-4 bg-gray-50 overflow-hidden'
    >
      <div className='max-w-7xl mx-auto'>
        <div ref={cardsRef} className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {cards.map((card, index) => (
            <div
              key={index}
              className='image-card relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-[450px]'
            >
              {/* Background Image */}
              <div className='absolute inset-0'>
                <Image
                  src={card.image}
                  alt={t(card.titleKey)}
                  fill
                  className={`transition-transform duration-700 group-hover:scale-105 ${
                    card.imagePosition === 'top'
                      ? 'object-cover object-top'
                      : 'object-cover object-center'
                  }`}
                  sizes='(max-width: 768px) 100vw, 33vw'
                />
              </div>

              {/* Gradient Overlay - softer, more elegant */}
              <div className='absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/40 to-purple-950/90' />

              {/* Content */}
              <div className='absolute inset-0 flex flex-col justify-end p-6'>
                <H3 className='font-bold text-2xl text-white mb-3 leading-tight border-none'>
                  {t(card.titleKey)}
                </H3>
                <P className='text-white/90 text-base leading-relaxed mb-4 mt-0!'>
                  {t(card.descriptionKey)}
                </P>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
