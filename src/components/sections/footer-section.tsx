'use client';

import React from 'react';
import { FOOTER_COMPANY } from '@/shared/footer-constants';
import { CONTACT } from '@/shared/constants';
import { P } from '@/components/ui/typography';

export const FooterSection: React.FC = () => {
  return (
    <footer className='bg-stone-50 border-t border-stone-100 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'>
          {/* Company Information */}
          <div>
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
          <div>
            <P className='font-semibold text-stone-900 mb-2 mt-0!'>Contact</P>
            <P className='text-sm text-stone-600 leading-relaxed mt-0!'>
              <a
                href={CONTACT.EMAIL.HREF}
                className='hover:text-purple-600 transition-colors duration-200'
              >
                {CONTACT.EMAIL.ADDRESS}
              </a>
              <br />
              <a
                href={CONTACT.PHONE.HREF}
                className='hover:text-purple-600 transition-colors duration-200'
              >
                {CONTACT.PHONE.DISPLAY}
              </a>
            </P>
          </div>

          {/* Copyright */}
          <div className='flex items-center justify-center md:justify-end'>
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
