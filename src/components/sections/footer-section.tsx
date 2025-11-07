'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FOOTER_COMPANY } from '@/shared/footer-constants';
import { CONTACT } from '@/shared/constants';
import { P } from '@/components/ui/typography';

gsap.registerPlugin(ScrollTrigger);

export const FooterSection: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const columns = content.querySelectorAll('.footer-column');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        end: 'bottom 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(columns, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === footer) trigger.kill();
      });
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className='bg-stone-50 border-t border-stone-100 py-8 px-4'
    >
      <div className='max-w-7xl mx-auto'>
        <div
          ref={contentRef}
          className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'
        >
          {/* Company Information */}
          <div className='footer-column'>
            <P className='font-semibold text-stone-900 mb-2 mt-0!'>
              {FOOTER_COMPANY.NAME}
            </P>
            <P className='text-sm text-stone-600 leading-relaxed mt-0!'>
              {FOOTER_COMPANY.ADDRESS.STREET}
              <br />
              {FOOTER_COMPANY.ADDRESS.POSTAL_CODE} {FOOTER_COMPANY.ADDRESS.CITY}
              <br />
              {FOOTER_COMPANY.TAX_ID.LABEL}: {FOOTER_COMPANY.TAX_ID.NUMBER}
            </P>
          </div>

          {/* Contact Information */}
          <div className='footer-column'>
            <P className='font-semibold text-stone-900 mb-2 mt-0!'>Contact</P>
            <P className='text-sm text-stone-600 leading-relaxed mt-0!'>
              <a
                href={CONTACT.EMAIL.HREF}
                className='hover:text-purple-500 transition-colors duration-200'
              >
                {CONTACT.EMAIL.ADDRESS}
              </a>
              <br />
              <a
                href={CONTACT.PHONE.HREF}
                className='hover:text-purple-500 transition-colors duration-200'
              >
                {CONTACT.PHONE.DISPLAY}
              </a>
            </P>
          </div>

          {/* Copyright */}
          <div className='footer-column flex items-center justify-center md:justify-end'>
            <P className='text-sm text-stone-500 mt-0!'>
              © {new Date().getFullYear()} {FOOTER_COMPANY.NAME}
              <br />
              <span className='text-xs'>All rights reserved</span>
            </P>
          </div>
        </div>
      </div>
    </footer>
  );
};
