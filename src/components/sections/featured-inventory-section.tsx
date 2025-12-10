'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslate } from '@tolgee/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, H3, P } from '@/components/ui/typography';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedInventorySection: React.FC = () => {
  const { t } = useTranslate();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Capture translation to trigger effect when it loads/changes
  const headerText = t('featured_inventory.header', { noWrap: true });

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
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
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      const cards = grid.querySelectorAll('.inventory-card');
      tl.from(
        cards,
        {
          y: 60,
          autoAlpha: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // Hover animations
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const imageContainer = cardElement.querySelector('.image-container');

        cardElement.addEventListener('mouseenter', () => {
          gsap.to(cardElement, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(imageContainer, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(cardElement, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(imageContainer, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [headerText]);

  const inventoryItems = [
    {
      image: '/images/stock-2.jpg',
    },
    {
      image: '/images/ren-2.png',
    },
    {
      image: '/images/stock-4.jpg',
    },
  ];

  return (
    <section
      id='featured-inventory'
      ref={sectionRef}
      className='py-20 px-4 bg-linear-to-b from-gray-50 to-white'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div ref={headerRef} className='text-center mb-16'>
          <P className='text-sm font-semibold tracking-wider text-[#5A3D85] uppercase md:mb-4'>
            {t('featured_inventory.eyebrow', { noWrap: true })}
          </P>
          <H2 className='font-black text-4xl md:text-5xl lg:text-6xl md:mb-6'>
            {t('featured_inventory.header', { noWrap: true })}
          </H2>
          <P className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-4!'>
            {t('featured_inventory.description', { noWrap: true })}
          </P>
        </div>

        {/* Inventory Grid - Max 3 per row */}
        <div
          ref={gridRef}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'
        >
          {inventoryItems.map((item, index) => (
            <div
              key={index}
              className='inventory-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'
            >
              {/* Image */}
              <div className='relative h-64 bg-gray-100 overflow-hidden image-container'>
                <Image
                  src={item.image}
                  alt={t(`featured_inventory.items[${index}].title`, {
                    noWrap: true,
                  })}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                />
              </div>

              {/* Content */}
              <div className='p-6'>
                <H3 className='font-bold text-xl mb-3 text-gray-900 border-none'>
                  {t(`featured_inventory.items[${index}].title`, {
                    noWrap: true,
                  })}
                </H3>
                <P className='text-gray-600 leading-relaxed mb-6 mt-0!'>
                  {t(`featured_inventory.items[${index}].description`, {
                    noWrap: true,
                  })}
                </P>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
