'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, H3, P } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedInventorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const inventoryItems = [
    {
      image: '/images/stock-2.jpg',
      title: 'Premium Designer Collection',
      description:
        'High-end fashion pieces from established brands. Perfect for boutique retailers looking to expand their luxury offerings with authenticated merchandise.',
    },
    {
      image: '/images/stock-3.jpg',
      title: 'Latest Tech Accessories',
      description:
        'Cutting-edge electronics and accessories from top manufacturers. Ideal for tech retailers seeking quality products with verified authenticity.',
    },
    {
      image: '/images/stock-4.jpg',
      title: 'Modern Furniture Collection',
      description:
        'Contemporary furniture sets combining style and functionality. Perfect for home goods retailers expanding their catalog with designer pieces.',
    },
  ];

  return (
    <section
      id='featured-inventory'
      ref={sectionRef}
      className='py-20 px-4 bg-gradient-to-b from-gray-50 to-white'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div ref={headerRef} className='text-center mb-16'>
          <P className='text-sm font-semibold tracking-wider text-purple-600 uppercase mb-4'>
            AVAILABLE NOW
          </P>
          <H2 className='font-black text-4xl md:text-5xl lg:text-6xl mb-6'>
            Featured Inventory
          </H2>
          <P className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
            Discover premium inventory opportunities from trusted brands across
            multiple categories
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
                  alt={item.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                />
              </div>

              {/* Content */}
              <div className='p-6'>
                <H3 className='font-bold text-xl mb-3 text-gray-900 border-none'>
                  {item.title}
                </H3>
                <P className='text-gray-600 leading-relaxed mb-6'>
                  {item.description}
                </P>

                {/* CTA Button */}
                <Button className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors duration-300'>
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className='text-center mt-12'>
          <Button
            variant='outline'
            size='lg'
            className='border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold px-8'
          >
            Browse All Inventory
          </Button>
        </div>
      </div>
    </section>
  );
};
