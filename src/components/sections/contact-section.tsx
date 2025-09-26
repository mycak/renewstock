'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, P } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import { CONTACT } from '@/shared/constants';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

export const ContactSection: React.FC = () => {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const description = descriptionRef.current;

    if (!section || !description) return;

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    // Get all text elements for aggressive animation
    const textElements = description.querySelectorAll('.contact-text');

    // Collect all words from all elements first
    const allWords: Element[] = [];
    const splitInstances: ReturnType<typeof SplitText.create>[] = [];

    textElements.forEach((element) => {
      const split = SplitText.create(element, {
        type: 'words',
        wordsClass: 'split-word',
      });
      splitInstances.push(split);
      allWords.push(...split.words);

      // Apply highlight background to highlighted links after split
      const highlightedLinks = element.querySelectorAll('.highlighted-link');
      highlightedLinks.forEach((link) => {
        // Find the split words that belong to this link
        const linkWords = split.words.filter(
          (word: Element) =>
            link.contains(word) || word.closest('.highlighted-link') === link
        );

        linkWords.forEach((word: Element) => {
          gsap.set(word, {
            background: 'linear-gradient(135deg, #c084fc, #a855f7, #d8b4fe)',
            color: '#1f2937',
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'inline-block',
          });
        });
      });
    });

    // Shuffle the words array for random order animation
    const shuffledWords = [...allWords].sort(() => Math.random() - 0.5);

    // Animate all words in random order
    tl.from(shuffledWords, {
      duration: 0.8,
      y: () => (Math.random() > 0.5 ? -120 : 120), // Random top or bottom
      opacity: 0,
      stagger: 0.07, // Faster stagger since we have more elements
      ease: 'power3.out',
      rotation: () => (Math.random() - 0.5) * 20, // Random rotation -10 to +10
    });

    // Cleanup function
    return () => {
      splitInstances.forEach((split) => {
        split.revert();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className='py-20 px-4 bg-white text-black'>
      <div className='max-w-6xl mx-auto text-center'>
        {/* Header */}
        <H2 className='contact-text font-black text-3xl md:text-3xl tracking-tight border-none'>
          {t('contact.header')}
        </H2>

        {/* Separator */}
        <Separator className='separator w-24 mx-auto mb-12 h-1 bg-black' />

        {/* Description Module */}
        <div ref={descriptionRef} className='space-y-8 md:space-y-12'>
          {/* Size 2: A PARTNER, NOT A PROBLEM SOLVER. */}
          <P className='contact-text font-bold text-xl md:text-2xl lg:text-3xl text-center tracking-tight mb-0'>
            {t('contact.description.partner_not_solver')}
          </P>

          {/* Size 3: YOU DON'T NEED TO FIX OVERSTOCK... - EXTRA BOLD - Smaller spacing */}
          <P
            className='contact-text font-black text-2xl md:text-4xl lg:text-4xl xl:text-5xl text-center leading-tighter tracking-tighter w-4/5 mx-auto mb-6'
            style={{ fontWeight: 900, lineHeight: '1.1' }}
          >
            {t('contact.description.dont_need_fix')}
          </P>

          {/* Size 4: RENEWSTOCK with RENEW bolder - Make this bolder */}
          <div className='contact-text text-center mb-0!'>
            <P
              className='font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl inline tracking-tight'
              style={{ fontWeight: 950 }}
            >
              <span className='font-bold'>RENEW</span>
              <span className='font-medium'>STOCK</span>
            </P>
          </div>

          {/* Size 1: RESALE, REDEFINED... */}
          <P className='contact-text text-sm md:text-base lg:text-lg text-center max-w-4xl mx-auto leading-relaxed mt-2! font-extrabold tracking-[-0.05em]'>
            {t('contact.description.resale_redefined')}
          </P>

          {/* Size 5: PHONE - Only link the phone number */}
          <div className='contact-text text-center'>
            <P
              className='font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-4 tracking-[-0.05em] flex items-center gap-4 mx-auto justify-center'
              style={{ fontWeight: 900 }}
            >
              {t('contact.description.phone_label')}
              <Link
                href={CONTACT.PHONE.HREF}
                className='highlighted-link text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl transition-all duration-300 hover:scale-105 hover:text-purple-500 inline-block'
              >
                {CONTACT.PHONE.DISPLAY}
              </Link>
            </P>
          </div>

          {/* Size 5: EMAIL - Only link the email address */}
          <div className='contact-text text-center'>
            <P
              className='font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-4 tracking-[-0.05em] flex items-center gap-4 mx-auto justify-center'
              style={{ fontWeight: 900 }}
            >
              <Link
                href={CONTACT.EMAIL.HREF}
                className='highlighted-link text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl transition-all duration-300 hover:scale-105 hover:text-purple-500 inline-block'
              >
                {CONTACT.EMAIL.ADDRESS}
              </Link>
              {t('contact.description.email_label')}
            </P>
          </div>
        </div>
      </div>
    </section>
  );
};
