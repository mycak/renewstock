'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Lottie from 'lottie-react';
import businessGirlAnimation from '../../../public/lottie/business-girl.json';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, P } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CONTACT } from '@/shared/constants';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

type ContactFormValues = {
  email: string;
  phone: string;
  message: string;
};

export const ContactSection: React.FC = () => {
  const { t } = useTranslation('common');

  // Contact form schema with translations
  const contactFormSchema = z.object({
    email: z.email(t('contact.form.validation.email_invalid')),
    phone: z.string().min(1, t('contact.form.validation.phone_required')),
    message: z
      .string()
      .min(10, t('contact.form.validation.message_min_length')),
  });
  const sectionRef = useRef<HTMLElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const formHeaderRef = useRef<HTMLHeadingElement>(null);
  const contactHeaderRef = useRef<HTMLHeadingElement>(null);
  const contactSeparatorRef = useRef<HTMLDivElement>(null);

  // Form setup
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log('Form data:', data);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const description = descriptionRef.current;
    const form = formRef.current;
    const lottie = lottieRef.current;
    const formHeader = formHeaderRef.current;
    const contactHeader = contactHeaderRef.current;
    const contactSeparator = contactSeparatorRef.current;

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

    // Animate contact header and separator first
    if (contactHeader) {
      const headerSplit = SplitText.create(contactHeader, {
        type: 'words',
        wordsClass: 'split-word',
      });

      tl.from(headerSplit.words, {
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }

    // Animate separator after header
    if (contactSeparator) {
      tl.from(
        contactSeparator,
        {
          duration: 0.6,
          scaleX: 0,
          transformOrigin: 'center',
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }

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

    // Animate Lottie, Form Header, and Form with separate ScrollTriggers
    if (lottie) {
      // Lottie animation
      gsap.fromTo(
        lottie,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lottie,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (formHeader) {
      // Form header animation - split text and animate words
      const headerSplit = SplitText.create(formHeader, {
        type: 'words',
        wordsClass: 'split-word',
      });

      gsap.fromTo(
        headerSplit.words,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formHeader,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (form) {
      // Form animation
      gsap.fromTo(
        form,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

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
        <H2
          ref={contactHeaderRef}
          className='font-black text-3xl md:text-3xl tracking-tight border-none'
        >
          {t('contact.header')}
        </H2>

        {/* Separator */}
        <Separator
          ref={contactSeparatorRef}
          className='w-24 mx-auto mb-12 h-1 bg-black'
        />

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

        {/* Contact Form */}
        <div className='mt-16 mx-auto'>
          {/* Business Girl Lottie Animation */}
          <div ref={lottieRef} className='flex justify-center mb-8'>
            <div className='w-32 h-32 md:w-60 md:h-60 lg:w-48 lg:h-48'>
              <Lottie
                animationData={businessGirlAnimation}
                loop={true}
                autoplay={true}
                className='w-full h-full'
              />
            </div>
          </div>

          {/* Form Header */}
          <H2
            ref={formHeaderRef}
            className='contact-text font-black text-3xl md:text-3xl tracking-tight border-none'
          >
            {t('contact.form.header')}
          </H2>

          {/* Form Separator */}
          <Separator className='separator w-24 mx-auto mb-12 h-1 bg-black' />

          <div ref={formRef} className='max-w-2xl mx-auto'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg font-semibold text-black'>
                        {t('contact.form.email_label')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('contact.form.email_placeholder')}
                          {...field}
                          className='border-2 border-gray-300 focus:border-purple-600 focus:ring-purple-600'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg font-semibold text-black'>
                        {t('contact.form.phone_label')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('contact.form.phone_placeholder')}
                          {...field}
                          className='border-2 border-gray-300 focus:border-purple-600 focus:ring-purple-600'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg font-semibold text-black'>
                        {t('contact.form.message_label')}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('contact.form.message_placeholder')}
                          rows={6}
                          {...field}
                          className='border-2 border-gray-300 focus:border-purple-600 focus:ring-purple-600 resize-none'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
                <Button
                  type='submit'
                  variant='outline'
                  className='cursor-pointer w-full border border-black text-black no-underline hover:underline hover:decoration-purple-500 hover:decoration-2 hover:underline-offset-4 font-semibold py-3 px-6 text-lg transition-all duration-300 ease-out'
                >
                  {t('contact.form.submit_button')}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};
