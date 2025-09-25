'use client';

import React from 'react';
import { useScrambleText } from '@/hooks/useScrambleText';
import { cn } from '@/lib/utils';

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  chars?: string; // "upperCase", "lowerCase", "upperAndLowerCase", or custom string
  speed?: number; // How frequently scrambled characters refresh
  revealDelay?: number; // Delay before revealing starts
  rightToLeft?: boolean; // Reveal from right to left
  delimiter?: string; // Character delimiter for word-by-word reveal
  tweenLength?: boolean; // Whether to gradually tween length difference
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  delay = 0,
  duration = 2,
  className,
  as: Component = 'span',
  chars,
  speed,
  revealDelay,
  rightToLeft,
  delimiter,
  tweenLength,
}) => {
  const elementRef = useScrambleText({
    text,
    delay,
    duration,
    chars,
    speed,
    revealDelay,
    rightToLeft,
    delimiter,
    tweenLength,
  });

  return React.createElement(
    Component,
    {
      ref: elementRef,
      className: cn('inline-block', className),
      'aria-label': text, // Accessibility: provide the actual text for screen readers
    },
    text // Initial text content (will be replaced by animation)
  );
};
