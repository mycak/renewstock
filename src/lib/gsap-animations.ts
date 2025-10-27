import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface AnimationConfig {
  trigger: Element;
  start?: string;
  end?: string;
  toggleActions?: string;
  markers?: boolean;
}

/**
 * Fade in element on scroll with subtle animation
 */
export const fadeInOnScroll = (
  element: Element | Element[],
  config: Partial<AnimationConfig> = {}
) => {
  const defaultConfig = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    ...config,
  };

  return gsap.from(element, {
    autoAlpha: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: defaultConfig,
  });
};

/**
 * Slide in from left with fade
 */
export const slideInFromLeft = (
  element: Element | Element[],
  config: Partial<AnimationConfig> = {}
) => {
  const defaultConfig = {
    start: 'top 75%',
    end: 'bottom 25%',
    toggleActions: 'play none none reverse',
    ...config,
  };

  return gsap.from(element, {
    x: -60,
    autoAlpha: 0,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: defaultConfig,
  });
};

/**
 * Slide in from right with fade
 */
export const slideInFromRight = (
  element: Element | Element[],
  config: Partial<AnimationConfig> = {}
) => {
  const defaultConfig = {
    start: 'top 75%',
    end: 'bottom 25%',
    toggleActions: 'play none none reverse',
    ...config,
  };

  return gsap.from(element, {
    x: 60,
    autoAlpha: 0,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: defaultConfig,
  });
};

/**
 * Slide in from bottom with fade
 */
export const slideInFromBottom = (
  element: Element | Element[],
  config: Partial<AnimationConfig> = {}
) => {
  const defaultConfig = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    ...config,
  };

  return gsap.from(element, {
    y: 50,
    autoAlpha: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: defaultConfig,
  });
};

/**
 * Stagger fade in for multiple elements
 */
export const staggerFadeIn = (
  elements: Element[] | NodeListOf<Element>,
  config: Partial<AnimationConfig> & { stagger?: number } = {}
) => {
  const defaultConfig = {
    start: 'top 75%',
    end: 'bottom 25%',
    toggleActions: 'play none none reverse',
    stagger: 0.15,
    ...config,
  };

  const { stagger, ...scrollTriggerConfig } = defaultConfig;

  return gsap.from(elements, {
    y: 40,
    autoAlpha: 0,
    duration: 0.8,
    stagger,
    ease: 'power2.out',
    scrollTrigger: scrollTriggerConfig,
  });
};

/**
 * Scale in animation with fade
 */
export const scaleIn = (
  element: Element | Element[],
  config: Partial<AnimationConfig> = {}
) => {
  const defaultConfig = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    ...config,
  };

  return gsap.from(element, {
    scale: 0.95,
    autoAlpha: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: defaultConfig,
  });
};

/**
 * Create a timeline with ScrollTrigger
 */
export const createScrollTimeline = (config: AnimationConfig) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: config.trigger,
      start: config.start || 'top 75%',
      end: config.end || 'bottom 25%',
      toggleActions: config.toggleActions || 'play none none reverse',
      markers: config.markers || false,
    },
  });
};

/**
 * Cleanup all ScrollTriggers for a specific trigger element
 */
export const cleanupScrollTriggers = (triggerElement: Element) => {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.vars.trigger === triggerElement) {
      trigger.kill();
    }
  });
};
