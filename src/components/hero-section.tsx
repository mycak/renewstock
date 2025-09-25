'use client';

import React from 'react';
import Image from 'next/image';
import { ScrambleText } from '@/components/ui/scramble-text';
import { TypewriterText } from '@/components/ui/typewriter-text';
import { H1, H2, P } from '@/components/ui/typography';

export const HeroSection: React.FC = () => {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white text-black'>
      {/* Animated Logo */}
      <div className='mb-16'>
        <Image
          src='/logo/animated-logo.gif'
          alt='RenewStock Animated Logo'
          width={400}
          height={280}
          priority
          className='w-auto h-40 md:h-52 lg:h-64'
          unoptimized // Required for GIFs to maintain animation
        />
      </div>

      {/* Main Header */}
      <div className='text-center max-w-6xl mx-auto space-y-8'>
        <H1
          className='font-black leading-tight tracking-tight'
          style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)' }}
        >
          <div className='whitespace-nowrap'>
            <ScrambleText
              text='THE CIRCULAR PARTNER YOU'
              delay={0.5}
              duration={3}
              className='block leading-13'
              as='span'
            />
          </div>
          <div className='whitespace-nowrap'>
            <ScrambleText
              text="DIDN'T KNOW YOU NEEDED"
              delay={2}
              duration={3}
              className='block leading-13'
              as='span'
            />
          </div>
        </H1>

        {/* Subheader */}
        <div className='space-y-6'>
          <H2
            className='font-bold leading-tight'
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.5rem)' }}
          >
            <TypewriterText
              texts={[
                'TRANSFORMING',
                'OVERSTOCK',
                'AND',
                'RETURNS',
                'INTO',
                'PERFORMANCE',
                'ASSETS.',
              ]}
              delay={4.5}
              typingSpeed={0.1}
              showCursor={true}
              className=''
              as='span'
            />
          </H2>

          {/* Disclaimer - smaller text */}
          <div className='pt-6'>
            <P className='text-sm md:text-base lg:text-lg font-medium text-gray-700'>
              <ScrambleText
                text='*NOT A LIQUIDATION HOUSE.'
                delay={5.5}
                duration={2}
                className='block mb-2'
                as='span'
              />
              <ScrambleText
                text='A REVENUE ENGINE.'
                delay={6}
                duration={2}
                className='block font-bold'
                as='span'
              />
            </P>
          </div>
        </div>
      </div>
    </section>
  );
};
