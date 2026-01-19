'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslate } from '@tolgee/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H3, P } from '@/components/ui/typography';

gsap.registerPlugin(ScrollTrigger);

export const ImageCardsSection: React.FC = () => {
  const { t } = useTranslate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const ctx = gsap.context(() => {
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

      cardElements.forEach((card, index) => {
        const direction =
          index === 0
            ? isMobile
              ? -320
              : -80
            : index === 1
            ? 0
            : isMobile
            ? 320
            : 80;
        const yOffset = index === 1 ? 60 : 30;

        tl.from(
          card,
          {
            x: direction,
            y: yOffset,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            clearProps: 'all',
          },
          index * 0.12
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  const cards = [
    {
      image: '/images/stock-9.jpg',
      title: t('image_cards.cards.sellers.title'),
      description: t('image_cards.cards.sellers.description'),
      imagePosition: 'center',
    },
    {
      image: '/images/stock-5.jpg',
      title: t('image_cards.cards.buyers.title'),
      description: t('image_cards.cards.buyers.description'),
      imagePosition: 'top',
    },
    {
      image: '/images/stock-10.jpg',
      title: t('image_cards.cards.distribution.title'),
      description: t('image_cards.cards.distribution.description'),
      imagePosition: 'center',
    },
  ];

  return (
    <section
      id='image-cards'
      ref={sectionRef}
      className='py-8 md:py-20 px-4 bg-gray-50 overflow-hidden'
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
                  alt={card.title}
                  fill
                  className={`transition-transform duration-700 group-hover:scale-105 ${
                    card.imagePosition === 'top'
                      ? 'object-cover object-top'
                      : 'object-cover object-center'
                  }`}
                  sizes='(max-width: 768px) 100vw, 33vw'
                />
              </div>

              {/* Gradient Overlay - starts at 30% height for clearer top */}
              <div
                className='absolute inset-0 pointer-events-none'
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(88,28,135,0.4) 80%, rgba(88,28,135,0.4) 100%)',
                }}
              />

              {/* Content */}
              <div className='absolute inset-0 flex flex-col justify-end p-6'>
                <H3 className='font-bold text-2xl text-white mb-3 leading-tight border-none'>
                  {card.title}
                </H3>
                <P className='text-white/90 text-base leading-relaxed mb-4 mt-0!'>
                  {card.description}
                </P>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
