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
    <section
      id='hero'
      className='min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white text-black'
    >
      {/* Animated Logo */}
      <div className='mb-8 md:mb-16'>
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
      <div className='text-center max-w-6xl mx-auto space-y-12 md:space-y-8'>
        <H1 className='font-black tracking-tighter px-2 text-center text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight md:leading-none mb-2 '>
          <div className='break-words hyphens-auto max-w-full overflow-hidden md:whitespace-nowrap'>
            <ScrambleText
              text={`${t('hero.main_header.line1')} ${t(
                'hero.main_header.partner'
              )} ${t('hero.main_header.line1_end')}`}
              delay={0}
              duration={1.5}
              chars='upperCase'
              speed={0.8}
              revealDelay={0}
              className='block leading-none'
              as='span'
            />
          </div>

          <div className='break-words hyphens-auto max-w-full overflow-hidden md:whitespace-nowrap'>
            <ScrambleText
              text={t('hero.main_header.line2')}
              delay={0}
              duration={1.2}
              chars='upperCase'
              speed={0.9}
              revealDelay={0}
              className='block leading-none'
              as='span'
            />
          </div>
        </H1>

        {/* Subheader */}
        <div className='space-y-6 w-4/5 md:max-w-3/5 mx-auto mt-4'>
          <H2 className='font-bold leading-tight text-sm! sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl min-h-[3.4rem]'>
            <TypewriterText
              texts={
                t('hero.subheader.words', { returnObjects: true }) as string[]
              }
              delay={0.3}
              typingSpeed={0.035}
              showCursor={false}
              className=''
              as='span'
            />
          </H2>

          {/* Disclaimer - smaller text */}
          <div>
            <div className='text-sm md:text-base lg:text-lg font-medium text-gray-700'>
              <P className='mb-2 text-sm font-bold'>
                <ScrambleText
                  text={t('hero.disclaimer.line1_start')}
                  delay={2.4}
                  duration={0.6}
                  chars='upperCase'
                  speed={0.7}
                  revealDelay={0.18}
                  className='inline'
                  as='span'
                />
                <ScrambleText
                  text={t('hero.disclaimer.line1_highlight')}
                  delay={0.3}
                  duration={3.3}
                  chars='upperCase'
                  speed={0.7}
                  revealDelay={0.18}
                  className='inline text-purple-600'
                  as='span'
                />
                <ScrambleText
                  text={t('hero.disclaimer.line1_end')}
                  delay={3.3}
                  duration={0.3}
                  chars='upperCase'
                  speed={0.7}
                  revealDelay={0.18}
                  className='inline'
                  as='span'
                />
              </P>
              <P className='font-bold mt-2!'>
                <ScrambleText
                  text={t('hero.disclaimer.line2')}
                  delay={3.6}
                  duration={0.9}
                  chars='upperCase'
                  speed={0.6}
                  revealDelay={0.12}
                  className='inline'
                  as='span'
                />
              </P>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
