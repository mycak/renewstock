'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, P } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export const HeroCardSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(card, {
      y: 100,
      autoAlpha: 0,
      scale: 0.95,
      duration: 1,
      ease: 'power3.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id='hero-card'
      ref={sectionRef}
      className='py-20 px-4 bg-gradient-to-b from-white to-purple-50/30'
    >
      <div className='max-w-6xl mx-auto'>
        <div
          ref={cardRef}
          className='relative rounded-3xl overflow-hidden shadow-2xl group'
        >
          {/* Background Image */}
          <div className='relative h-[600px] md:h-[600px]'>
            <Image
              src='/images/stock-4.jpg'
              alt='Join our platform'
              fill
              className='object-cover transition-transform duration-[2000ms] group-hover:scale-105'
              sizes='(max-width: 1280px) 100vw, 1280px'
              priority
            />

            {/* Multi-layer Gradient Overlay for better text visibility */}
            <div className='absolute inset-0 bg-gradient-to-br from-purple-900/60 via-purple-800/70 to-indigo-900/80' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

            {/* Decorative blur elements */}
            <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl' />
            <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl' />
          </div>

          {/* Content Overlay */}
          <div className='absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12'>
            <div className='max-w-4xl backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-10 border border-white/10'>
              <H2 className='font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight drop-shadow-lg'>
                Transform Your Inventory Management
              </H2>
              <P className='text-base md:text-lg lg:text-xl text-white/95 leading-relaxed mb-6 drop-shadow-md'>
                Join thousands of satisfied partners who trust our platform for
                intelligent inventory distribution.
              </P>

              <div className='flex flex-col sm:flex-row gap-3 justify-center items-center mb-8'>
                <Button
                  onClick={scrollToContact}
                  size='lg'
                  className='bg-white text-purple-700 hover:bg-purple-50 font-bold px-8 py-3 text-base rounded-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105'
                >
                  Get Started Today
                </Button>
                <Button
                  onClick={scrollToContact}
                  size='lg'
                  variant='outline'
                  className='bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-3 text-base rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105'
                >
                  Schedule a Demo
                </Button>
              </div>

              {/* Stats Row */}
              <div className='grid grid-cols-3 gap-4 pt-6 border-t border-white/20'>
                <div>
                  <P className='text-2xl md:text-3xl font-black text-white mb-1'>
                    7K+
                  </P>
                  <P className='text-xs md:text-sm text-white/80'>
                    Active Listings
                  </P>
                </div>
                <div>
                  <P className='text-2xl md:text-3xl font-black text-white mb-1'>
                    $2B+
                  </P>
                  <P className='text-xs md:text-sm text-white/80'>Total MSRP</P>
                </div>
                <div>
                  <P className='text-2xl md:text-3xl font-black text-white mb-1'>
                    4.5K+
                  </P>
                  <P className='text-xs md:text-sm text-white/80'>
                    Brands Listed
                  </P>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
