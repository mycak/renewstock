'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';

type NavigationItem = {
  key: string;
  label: string;
  href: string;
  sectionId?: string;
};

export const NavigationHeader: React.FC = () => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Navigation items
  const navigationItems: NavigationItem[] = [
    {
      key: 'home',
      label: t('navigation.home'),
      href: '#hero',
      sectionId: 'hero',
    },
    {
      key: 'about',
      label: t('navigation.about'),
      href: '#defines-us',
      sectionId: 'defines-us',
    },
    {
      key: 'contact',
      label: t('navigation.contact'),
      href: '#contact',
      sectionId: 'contact',
    },
  ];

  // Handle smooth scrolling to sections
  const handleNavClick = (sectionId: string) => {
    setIsOpen(false); // Close mobile menu

    const element = document.getElementById(sectionId);
    if (element) {
      // Get header height for offset
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const elementPosition = element.offsetTop - headerHeight - 20; // 20px extra padding

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  // Header animation on mount
  useEffect(() => {
    if (headerRef.current) {
      // Set initial state and animate to visible
      gsap.fromTo(
        headerRef.current,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5, // Delay to appear after hero animation
          onComplete: () => {
            // Remove Tailwind classes that conflict with final state
            if (headerRef.current) {
              headerRef.current.classList.remove(
                'opacity-0',
                '-translate-y-full'
              );
            }
          },
        }
      );
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className='fixed top-0 left-0 right-0 z-50 transition-all duration-[270ms] bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20 backdrop-saturate-150 opacity-0 -translate-y-full'
    >
      <div className='max-w-6xl mx-auto px-4 md:px-8'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* Logo / Brand */}
          <div className='flex-shrink-0'>
            <button
              onClick={() => handleNavClick('hero')}
              className='text-2xl md:text-3xl lg:text-4xl font-black text-black hover:text-purple-600 transition-colors duration-[270ms]'
            >
              RENEWSTOCK
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.sectionId || item.key)}
                className='text-black hover:text-purple-600 font-semibold transition-colors duration-[270ms] relative group'
              >
                {item.label}
                <span className='absolute -bottom-1 left-0 w-0 h-1 bg-purple-600 transition-all duration-[270ms] group-hover:w-full' />
              </button>
            ))}
            <LanguageSwitcher isFixed={false} />
          </nav>

          {/* Mobile Menu */}
          <div className='md:hidden absolute right-4'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-black hover:text-purple-600 hover:bg-purple-50 transition-colors duration-[270ms] h-14 w-14'
                >
                  <Menu className='h-12 w-12' strokeWidth={3} />
                  <span className='sr-only'>Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side='top'
                className='w-full h-screen bg-white border-none px-6'
              >
                <SheetHeader className='text-left pt-8 pb-12'>
                  <div className='flex items-center justify-between'>
                    <SheetTitle className='text-3xl md:text-4xl font-black text-black'>
                      RENEWSTOCK
                    </SheetTitle>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => setIsOpen(false)}
                      className='text-black hover:text-purple-600 hover:bg-purple-50'
                    >
                      <X className='h-6 w-6' />
                    </Button>
                  </div>
                </SheetHeader>

                {/* Mobile Navigation Items */}
                <nav className='flex flex-col space-y-8 pt-8 px-2'>
                  {navigationItems.map((item, index) => (
                    <button
                      key={item.key}
                      onClick={() => handleNavClick(item.sectionId || item.key)}
                      className='text-left text-2xl md:text-3xl font-black text-black hover:text-purple-600 transition-all duration-[270ms] relative group w-max'
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: isOpen
                          ? 'slideInFromRight 0.45s ease-out forwards'
                          : 'none',
                      }}
                    >
                      {item.label}
                      <span className='absolute -bottom-1 left-0 w-0 h-1 bg-purple-600 transition-all duration-[270ms] group-hover:w-full' />
                    </button>
                  ))}

                  {/* Language Switcher in Mobile Menu */}
                  <div className='pt-8 mt-8 border-t border-gray-200'>
                    <p className='text-lg font-bold text-black mb-2'>
                      {t('navigation.language')}
                    </p>
                    <div className='relative z-10'>
                      <LanguageSwitcher isFixed={false} />
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Absolutely positioned Language Switcher */}
      </div>

      {/* slideInFromRight animation is defined in globals.css */}
    </header>
  );
};
