'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H3, P } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export const ImageCardsSection: React.FC = () => {
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
    tl.from(cardElements, {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
      clearProps: 'all',
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
      title: 'Sellers: Maximize Revenue',
      description:
        'Transform excess inventory into new revenue streams with complete control.',
      ctaText: 'Start Selling',
      imagePosition: 'center',
    },
    {
      image: '/images/stock-5.jpg',
      title: 'Buyers: Premium Access',
      description:
        'Discover curated inventory from established brands at competitive pricing.',
      ctaText: 'Browse Inventory',
      imagePosition: 'top',
    },
    {
      image: '/images/stock-10.jpg',
      title: 'Global Distribution',
      description:
        'Connect with verified partners worldwide through our trusted platform.',
      ctaText: 'Learn More',
      imagePosition: 'center',
    },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id='image-cards'
      ref={sectionRef}
      className='py-20 px-4 bg-gray-50'
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

              {/* Gradient Overlay - softer, more elegant */}
              <div className='absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/40 to-purple-950/90' />

              {/* Content */}
              <div className='absolute inset-0 flex flex-col justify-end p-6'>
                <H3 className='font-bold text-2xl text-white mb-3 leading-tight border-none'>
                  {card.title}
                </H3>
                <P className='text-white/90 text-base leading-relaxed mb-4 mt-0!'>
                  {card.description}
                </P>
                <Button
                  onClick={scrollToContact}
                  size='sm'
                  className='bg-white/95 text-purple-700 hover:bg-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-fit backdrop-blur-sm'
                >
                  {card.ctaText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
