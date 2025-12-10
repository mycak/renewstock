'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FOOTER_COMPANY } from '@/shared/footer-constants';
import { P } from '@/components/ui/typography';

gsap.registerPlugin(ScrollTrigger);

export const FooterSection: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const ctx = gsap.context(() => {
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
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className='bg-stone-50 border-t border-stone-100 py-8 px-4'
    >
      <div className='max-w-7xl mx-auto'>
        <div
          ref={contentRef}
          className='grid grid-cols-1 gap-8 text-center justify-items-center'
        >
          {/* Company Information Only */}
          <div className='footer-column'>
            <P className='font-semibold text-stone-900 mb-2 mt-0!'>
              {FOOTER_COMPANY.NAME}
            </P>
            <P className='text-sm text-stone-600 leading-relaxed mt-0!'>
              {FOOTER_COMPANY.ADDRESS.STREET}
              <br />
              {FOOTER_COMPANY.ADDRESS.POSTAL_CODE} {FOOTER_COMPANY.ADDRESS.CITY}
              <br />
              {FOOTER_COMPANY.ADDRESS.COUNTRY}
              <br />
              {FOOTER_COMPANY.TAX_ID.LABEL}: {FOOTER_COMPANY.TAX_ID.NUMBER}
              <br />
              {FOOTER_COMPANY.KRS.LABEL}: {FOOTER_COMPANY.KRS.NUMBER}
            </P>
          </div>
        </div>
      </div>
    </footer>
  );
};
