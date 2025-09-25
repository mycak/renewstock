'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { ScrambleText } from '@/components/ui/scramble-text';
import { TypewriterText } from '@/components/ui/typewriter-text';
import { H1, H2, P } from '@/components/ui/typography';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <section className='min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white text-black'>
      {/* Animated Logo */}
      <div className='mb-16'>
        <Image
          src='/logo/animated-logo.gif'
          alt={t('hero.logo_alt')}
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
          className='font-black tracking-tight'
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 6rem)',
            lineHeight: 'clamp(2.2rem, 4.5vw, 5.4rem)',
          }}
        >
          <div className='whitespace-nowrap'>
            <ScrambleText
              text={`${t('hero.main_header.line1')} ${t(
                'hero.main_header.partner'
              )} ${t('hero.main_header.line1_end')}`}
              delay={0}
              duration={2.4}
              chars='upperCase'
              speed={0.6}
              revealDelay={0}
              className='block'
              as='span'
            />
          </div>

          <div className='whitespace-nowrap'>
            <ScrambleText
              text={t('hero.main_header.line2')}
              delay={0}
              duration={2}
              chars='upperCase'
              speed={0.7}
              revealDelay={0}
              className='block'
              as='span'
            />
          </div>
        </H1>

        {/* Subheader */}
        <div className='space-y-6 max-w-3/5 mx-auto'>
          <H2
            className='font-bold leading-tight max-w'
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.5rem)' }}
          >
            <TypewriterText
              texts={
                t('hero.subheader.words', { returnObjects: true }) as string[]
              }
              delay={0.5}
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
                text={t('hero.disclaimer.line1')}
                delay={4}
                duration={1.5}
                chars='upperCase'
                speed={0.5}
                revealDelay={0.3}
                className='block mb-2 text-purple-600 text-sm font-bold'
                as='span'
              />
              <ScrambleText
                text={t('hero.disclaimer.line2')}
                delay={5}
                duration={1.5}
                chars='upperCase'
                speed={0.4}
                revealDelay={0.2}
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
