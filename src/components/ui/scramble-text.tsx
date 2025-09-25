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
  scrambleChars?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  delay = 0,
  duration = 2,
  className,
  as: Component = 'span',
  scrambleChars,
}) => {
  const elementRef = useScrambleText({
    text,
    delay,
    duration,
    scrambleChars,
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
