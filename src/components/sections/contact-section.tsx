'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cleanupSplitTextAria } from '@/lib/gsap-utils';
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

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const ContactSection: React.FC = () => {
  const { t } = useTranslation('common');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Contact form schema with translations
  const contactFormSchema = z.object({
    name: z.string().min(1, t('contact.form.validation.name_required')),
    email: z.string().email(t('contact.form.validation.email_invalid')),
    phone: z.string().min(1, t('contact.form.validation.phone_required')),
    message: z
      .string()
      .min(10, t('contact.form.validation.message_min_length')),
  });
  const sectionRef = useRef<HTMLElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactHeaderRef = useRef<HTMLHeadingElement>(null);
  const contactSeparatorRef = useRef<HTMLDivElement>(null);

  // Form setup
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setFormStatus('loading');
    setStatusMessage(t('contact.form.messages.sending'));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        setFormStatus('success');
        setStatusMessage(t('contact.form.messages.success'));
        form.reset(); // Clear the form on success
      } else {
        setFormStatus('error');
        setStatusMessage(result.error || t('contact.form.messages.error'));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setStatusMessage(t('contact.form.messages.error'));
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const description = descriptionRef.current;
    const form = formRef.current;
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
        tag: 'span',
      });

      // Remove any ARIA attributes that SplitText might have added
      cleanupSplitTextAria(contactHeader as HTMLElement, headerSplit);

      tl.from(headerSplit.words, {
        duration: 0.36,
        y: 100,
        opacity: 0,
        stagger: 0.072,
        ease: 'power2.out',
      });
    }

    // Animate separator after header
    if (contactSeparator) {
      tl.from(
        contactSeparator,
        {
          duration: 0.54,
          scaleX: 0,
          transformOrigin: 'center',
          ease: 'power2.out',
        },
        '-=0.18'
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
        reduceWhiteSpace: false,
        // Disable ARIA attributes to prevent accessibility issues
        tag: 'span', // Ensure words are wrapped in spans, not divs
      });
      splitInstances.push(split);
      allWords.push(...split.words);

      // Remove any ARIA attributes that SplitText might have added
      cleanupSplitTextAria(element as HTMLElement, split);

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
      duration: 0.72,
      y: () => (Math.random() > 0.5 ? -120 : 120), // Random top or bottom
      opacity: 0,
      stagger: 0.054, // Faster stagger since we have more elements
      ease: 'power3.out',
      rotation: () => (Math.random() - 0.5) * 20, // Random rotation -10 to +10
    });

    // Animate Form with separate ScrollTrigger
    if (form) {
      // Form animation - appears later with bigger delay
      gsap.fromTo(
        form,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          delay: 0.45, // Add delay for later appearance
          scrollTrigger: {
            trigger: form,
            start: 'top 85%', // Trigger when form is closer to viewport
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
    <section
      id='contact'
      ref={sectionRef}
      className='py-20 px-4 bg-white text-black'
    >
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
        </div>

        {/* Contact Form */}
        <div className='mt-16 mx-auto'>
          <div ref={formRef} className='max-w-2xl mx-auto'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg font-semibold text-black'>
                        {t('contact.form.name_label')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('contact.form.name_placeholder')}
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
                  disabled={formStatus === 'loading'}
                  className='cursor-pointer w-full border border-black text-black underline decoration-purple-600 decoration-2 underline-offset-4 hover:decoration-4 font-semibold py-3 px-6 text-lg transition-all duration-[270ms] ease-out disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {formStatus === 'loading'
                    ? t('contact.form.messages.sending')
                    : t('contact.form.submit_button')}
                </Button>
                {/* Status Message */}
                {statusMessage && (
                  <div
                    className={`mt-4 p-4 rounded-md text-center font-medium ${
                      formStatus === 'success'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : formStatus === 'error'
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {statusMessage}
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};
