'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Users, UserCheck } from 'lucide-react';
import { H2, H3, P } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

export const OurTeamSection: React.FC = () => {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    // Split header text - words only
    const headerSplit = SplitText.create(header, {
      type: 'words',
      wordsClass: 'split-word',
    });

    // Animate header words
    tl.from(headerSplit.words, {
      duration: 0.8,
      y: 100,
      autoAlpha: 0,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Animate separator after header
    const separator = section.querySelector('.separator');
    if (separator) {
      tl.from(
        separator,
        {
          duration: 0.6,
          scaleX: 0,
          transformOrigin: 'center',
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }

    // Animate team cards with contained effects (no overflow)
    const cardElements = cards.querySelectorAll('.team-card');

    cardElements.forEach((card, index) => {
      // Different entrance animations that don't cause overflow
      const directions = [
        { y: 50, scale: 0.8, rotation: -15 }, // From bottom with slight rotation
        { y: 30, scale: 0.6, rotation: 360 }, // From bottom with scale
        { y: 40, scale: 0.7, rotation: 50 }, // From bottom with slight rotation
      ];

      const direction = directions[index % directions.length];

      // Initial state - no X translations that could cause overflow
      gsap.set(card, {
        autoAlpha: 0,
        ...direction,
      });

      // Animate card entrance with elastic effect
      tl.to(
        card,
        {
          duration: 1.2,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          ease: 'elastic.out(1, 0.8)',
        },
        `-=${0.8 - index * 0.2}` // Staggered timing
      );

      // Add floating animation
      gsap.to(card, {
        y: -10,
        duration: 2 + index * 0.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1 + index * 0.3,
      });

      // Avatar icon animation within each card
      const avatar = card.querySelector('.team-avatar');
      if (avatar) {
        // Pulsing effect
        gsap.to(avatar, {
          scale: 1.1,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2 + index * 0.2,
        });
      }

      // Add hover effects
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotationY: 5,
          z: 50,
          duration: 0.3,
          ease: 'power2.out',
        });

        if (avatar) {
          gsap.to(avatar, {
            rotation: 360,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      gsap.set(cardElements, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
      });
    }

    // Cleanup function
    return () => {
      headerSplit?.revert();
    };
  }, []);

  const teamMembers = [
    {
      nameKey: 'our_team.members.anna.name',
      roleKey: 'our_team.members.anna.role',
      descriptionKey: 'our_team.members.anna.description',
      icon: User,
    },
    {
      nameKey: 'our_team.members.michael.name',
      roleKey: 'our_team.members.michael.role',
      descriptionKey: 'our_team.members.michael.description',
      icon: Users,
    },
    {
      nameKey: 'our_team.members.sofia.name',
      roleKey: 'our_team.members.sofia.role',
      descriptionKey: 'our_team.members.sofia.description',
      icon: UserCheck,
    },
  ];

  return (
    <section ref={sectionRef} className='py-20 px-4 bg-white'>
      <div className='max-w-6xl mx-auto text-center'>
        {/* Header */}
        <H2
          ref={headerRef}
          className='font-black text-3xl md:text-3xl tracking-tight border-none'
        >
          {t('our_team.header')}
        </H2>

        {/* Separator */}
        <Separator className='separator w-24 mx-auto mb-12 h-1 bg-black' />

        {/* Team Cards */}
        <div
          ref={cardsRef}
          className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'
        >
          {teamMembers.map((member, index) => {
            const IconComponent = member.icon;

            return (
              <div
                key={index}
                className='team-card bg-white border-2 border-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform-gpu'
                style={{ perspective: '1000px' }}
              >
                {/* Avatar */}
                <div className='team-avatar mb-4 flex justify-center'>
                  <div className='w-20 h-20 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-full flex items-center justify-center'>
                    <IconComponent className='w-10 h-10 text-white' />
                  </div>
                </div>

                {/* Name */}
                <H3 className='font-bold text-xl mb-2 text-gray-800'>
                  {t(member.nameKey)}
                </H3>

                {/* Role */}
                <div className='mb-3'>
                  <span className='inline-block bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full'>
                    {t(member.roleKey)}
                  </span>
                </div>

                {/* Description */}
                <P className='text-gray-600 leading-relaxed text-sm mt-0'>
                  {t(member.descriptionKey)}
                </P>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
