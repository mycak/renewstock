'use client';

import React from 'react';
import { useTypewriterEffect } from '@/hooks/useTypewriterEffect';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  texts: string[];
  delay?: number;
  typingSpeed?: number;
  showCursor?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  delay = 0,
  typingSpeed = 0.05,
  showCursor = true,
  className,
  as: Component = 'span',
}) => {
  const elementRef = useTypewriterEffect({
    texts,
    delay,
    typingSpeed,
    showCursor,
  });

  return React.createElement(
    Component,
    {
      ref: elementRef,
      className: cn('inline-block', className),
      'aria-label': texts.join(' '), // Accessibility: provide the full text for screen readers
    },
    texts.join(' ') // Initial content (will be replaced by animation)
  );
};
