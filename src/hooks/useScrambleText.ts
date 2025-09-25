import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface UseScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  chars?: string; // Characters to use for scrambling ("upperCase", "lowerCase", "upperAndLowerCase", or custom string)
  speed?: number; // How frequently scrambled characters are refreshed (default: 1)
  revealDelay?: number; // Delay before revealing starts
  rightToLeft?: boolean; // Reveal from right to left
  delimiter?: string; // Character delimiter for word-by-word reveal
  tweenLength?: boolean; // Whether to gradually tween the length difference
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

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Helper function to get scramble characters based on chars parameter
    const getScrambleChars = (charsType: string): string => {
      switch (charsType) {
        case 'upperCase':
          return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        case 'lowerCase':
          return 'abcdefghijklmnopqrstuvwxyz';
        case 'upperAndLowerCase':
          return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        default:
          return charsType; // Custom characters
      }
    };

    const scrambleChars = getScrambleChars(chars);
    const originalText = element.textContent || '';
    const targetText = text;
    const originalLength = originalText.length;
    const targetLength = targetText.length;

    // Create timeline with proper defaults
    const timeline = gsap.timeline({
      delay,
      defaults: { ease: 'none' },
    });

    // Set initial state
    element.textContent = originalText;

    // Calculate reveal start time based on revealDelay
    const revealStartTime = revealDelay;
    const scrambleEndTime = duration;

    let scrambleInterval: NodeJS.Timeout;

    timeline.to(
      {},
      {
        duration: scrambleEndTime,
        onStart: () => {
          // Start scrambling animation
          scrambleInterval = setInterval(() => {
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

            // Determine how many characters to reveal
            const revealedCount = Math.floor(revealProgress * targetLength);

            for (let i = 0; i < currentLength; i++) {
              const isRevealed = rightToLeft
                ? i >= currentLength - revealedCount
                : i < revealedCount;

              if (isRevealed && i < targetLength) {
                // Character is revealed
                if (delimiter && delimiter !== '') {
                  // Word-by-word reveal logic could be implemented here
                  currentText += targetText[i];
                } else {
                  currentText += targetText[i];
                }
              } else if (i < targetLength) {
                // Character is still scrambled
                if (Math.random() < speed / 10) {
                  // Speed affects scramble frequency
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
          }, 50 / speed); // Speed affects update frequency
        },
        onComplete: () => {
          if (scrambleInterval) {
            clearInterval(scrambleInterval);
          }
          if (element) {
            element.textContent = targetText;
          }
        },
      }
    );

    return () => {
      if (scrambleInterval) {
        clearInterval(scrambleInterval);
      }
      timeline.kill();
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
