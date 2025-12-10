import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface UseTypewriterEffectProps {
  texts: string[];
  delay?: number;
  typingSpeed?: number;
  showCursor?: boolean;
}

export const useTypewriterEffect = ({
  texts,
  delay = 0,
  typingSpeed = 0.05,
  showCursor = true,
}: UseTypewriterEffectProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const cursorTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Memoize texts array comparison
  const textsKey = texts.join('|');

  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    if (cursorTimelineRef.current) {
      cursorTimelineRef.current.kill();
      cursorTimelineRef.current = null;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean up previous animations
    cleanup();

    // Clear container
    container.innerHTML = '';

    // Create text elements for each text segment
    const textElements: HTMLSpanElement[] = [];
    texts.forEach((text, index) => {
      const span = document.createElement('span');
      span.id = `typewriter-text-${index}`;
      span.textContent = '';
      container.appendChild(span);
      textElements.push(span);

      // Add space between segments (except last one)
      if (index < texts.length - 1) {
        container.appendChild(document.createTextNode(' '));
      }
    });

    // Create cursor
    let cursor: HTMLSpanElement | null = null;
    if (showCursor) {
      cursor = document.createElement('span');
      cursor.id = 'typewriter-cursor';
      cursor.textContent = '|';
      cursor.className = 'opacity-100';
      container.appendChild(cursor);
    }

    // Create timeline
    const tl = gsap.timeline({ delay });
    timelineRef.current = tl;

    // Cursor animation
    if (cursor) {
      const cursorTl = gsap.timeline({ repeat: -1 });
      cursorTimelineRef.current = cursorTl;

      cursorTl
        .to(cursor, {
          opacity: 0,
          duration: 0.5,
          ease: 'none',
          delay: 0.2,
        })
        .to(cursor, {
          opacity: 1,
          duration: 0.5,
          ease: 'none',
          delay: 0.2,
        });

      // Start cursor animation after all text is typed
      tl.add(cursorTl, texts.length * 2);
    }

    // Add typewriter animations for each text segment
    texts.forEach((text, index) => {
      tl.to(
        textElements[index],
        {
          duration: text.length * typingSpeed,
          ease: 'none',
          onUpdate: function () {
            const progress = this.progress();
            const currentLength = Math.floor(progress * text.length);
            textElements[index].textContent = text.slice(0, currentLength);
          },
          onComplete: () => {
            textElements[index].textContent = text;
          },
        },
        index === 0 ? 0 : '+=0.2'
      );
    });

    return cleanup;
    // textsKey is a stable string derived from texts array - using texts directly causes infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textsKey, delay, typingSpeed, showCursor, cleanup]);

  return containerRef;
};
