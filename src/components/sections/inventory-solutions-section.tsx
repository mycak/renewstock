'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, H3, P } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export const InventorySolutionsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(content, {
      x: -60,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power2.out',
    }).from(
      image,
      {
        x: 60,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.6'
    );

    const cards = content.querySelectorAll('.solution-card');
    tl.from(
      cards,
      {
        y: 40,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const solutions = [
    {
      title: 'Quickly turn inventory into liquidity',
      description: 'Turn existing inventory into cash.',
      image: '/images/stock-1.jpg',
      content: {
        heading: 'Fast Conversion',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
      },
    },
    {
      title: 'Maximize underutilized revenue',
      description:
        "Set the price you want to get for your product; we'll take care of the rest.",
      image: '/images/stock-2.jpg',
      content: {
        heading: 'Revenue Optimization',
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
    },
    {
      title: 'Control where your inventory goes',
      description:
        'Control which distribution channels, retailers, and geographies your inventory is sold in.',
      image: '/images/stock-3.jpg',
      content: {
        heading: 'Full Control',
        text: 'Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante donec eu libero.',
      },
    },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSolutionClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id='inventory-solutions'
      ref={sectionRef}
      className='py-20 px-4 bg-gradient-to-br from-white via-purple-50/30 to-white'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          {/* Left Content */}
          <div ref={contentRef} className='lg:sticky lg:top-24'>
            <div className='mb-8'>
              <P className='text-sm font-semibold tracking-wider text-purple-600 uppercase mb-0'>
                SELLERS
              </P>
              <H2 className='font-black text-2xl md:text-4xl mb-6 leading-tight mt-0!'>
                New revenue streams for all types of inventory
              </H2>
            </div>

            <div className='space-y-4 mb-8'>
              {solutions.map((solution, index) => (
                <button
                  key={index}
                  onClick={() => handleSolutionClick(index)}
                  className={`solution-card w-full text-left p-4 rounded-lg transition-all duration-300 cursor-pointer block ${
                    activeIndex === index
                      ? 'border-l-4 border-purple-600 pl-6 bg-purple-50'
                      : 'border-l-4 border-transparent pl-6 hover:bg-gray-50'
                  }`}
                >
                  <H3
                    className={`font-bold text-lg md:text-xl mb-2 border-none ${
                      activeIndex === index ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {solution.title}
                  </H3>
                  <P className='text-gray-600 leading-relaxed mt-0 text-sm md:text-base'>
                    {solution.description}
                  </P>
                </button>
              ))}
            </div>

            {/* Call to Action Button */}
            <div>
              <Button
                onClick={scrollToContact}
                size='lg'
                className='bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'
              >
                Get Started Today
              </Button>
            </div>
          </div>

          {/* Right Image with Overlay Card */}
          <div ref={imageRef} className='relative'>
            <div className='relative rounded-2xl overflow-hidden bg-gray-200 shadow-lg'>
              <div className='relative h-[400px] md:h-[500px]'>
                <Image
                  src={solutions[activeIndex].image}
                  alt={solutions[activeIndex].title}
                  fill
                  className='object-cover transition-opacity duration-500'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              </div>

              {/* Floating Card Overlay */}
              <div className='bg-white p-6 rounded-b-2xl'>
                <H3 className='font-bold text-xl md:text-2xl text-gray-900 mb-3 border-none'>
                  {solutions[activeIndex].content.heading}
                </H3>
                <P className='text-gray-600 leading-relaxed mt-0'>
                  {solutions[activeIndex].content.text}
                </P>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
