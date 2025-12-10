import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface UseScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  chars?: string;
  speed?: number;
  revealDelay?: number;
  rightToLeft?: boolean;
  delimiter?: string;
  tweenLength?: boolean;
}

export const useScrambleText = ({
  text,
  delay = 0,
  duration = 2,
  chars = 'upperCase',
  speed = 1,
  revealDelay = 0,
  rightToLeft = false,
  delimiter = '',
  tweenLength = true,
}: UseScrambleTextProps) => {
  const elementRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Clean up previous animation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    const getScrambleChars = (charsType: string): string => {
      switch (charsType) {
        case 'upperCase':
          return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        case 'lowerCase':
          return 'abcdefghijklmnopqrstuvwxyz';
        case 'upperAndLowerCase':
          return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        default:
          return charsType;
      }
    };

    const scrambleChars = getScrambleChars(chars);
    const originalText = element.textContent || '';
    const targetText = text;
    const originalLength = originalText.length;
    const targetLength = targetText.length;

    const timeline = gsap.timeline({
      delay,
      defaults: { ease: 'none' },
    });
    timelineRef.current = timeline;

    element.textContent = originalText;

    const revealStartTime = revealDelay;
    const scrambleEndTime = duration;

    timeline.to(
      {},
      {
        duration: scrambleEndTime,
        onStart: () => {
          intervalRef.current = setInterval(() => {
            const currentTime = timeline.time();
            const totalProgress = Math.min(currentTime / scrambleEndTime, 1);
            const revealProgress = Math.max(
              0,
              (currentTime - revealStartTime) /
                (scrambleEndTime - revealStartTime)
            );

            let currentText = '';
            const currentLength = tweenLength
              ? Math.round(
                  originalLength +
                    (targetLength - originalLength) * totalProgress
                )
              : targetLength;

            const revealedCount = Math.floor(revealProgress * targetLength);

            for (let i = 0; i < currentLength; i++) {
              const isRevealed = rightToLeft
                ? i >= currentLength - revealedCount
                : i < revealedCount;

              if (isRevealed && i < targetLength) {
                if (delimiter && delimiter !== '') {
                  currentText += targetText[i];
                } else {
                  currentText += targetText[i];
                }
              } else if (i < targetLength) {
                if (Math.random() < speed / 10) {
                  currentText +=
                    scrambleChars[
                      Math.floor(Math.random() * scrambleChars.length)
                    ];
                } else {
                  currentText +=
                    element.textContent?.[i] ||
                    scrambleChars[
                      Math.floor(Math.random() * scrambleChars.length)
                    ];
                }
              }
            }

            if (element) {
              element.textContent = currentText;
            }
          }, 50 / speed);
        },
        onComplete: () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          if (element) {
            element.textContent = targetText;
          }
        },
      }
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [
    text,
    delay,
    duration,
    chars,
    speed,
    revealDelay,
    rightToLeft,
    delimiter,
    tweenLength,
  ]);

  return elementRef;
};
