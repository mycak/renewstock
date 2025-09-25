import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface UseScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  scrambleChars?: string;
}

export const useScrambleText = ({
  text,
  delay = 0,
  duration = 2,
  scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
}: UseScrambleTextProps) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const originalText = text;
    const textLength = originalText.length;

    // Set initial scrambled text
    element.textContent = originalText
      .split('')
      .map(
        () => scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
      )
      .join('');

    const timeline = gsap.timeline({ delay });

    // Animation to reveal the original text character by character
    timeline.to(
      {},
      {
        duration,
        ease: 'power2.out',
        onUpdate: function () {
          const progress = this.progress();
          const revealedLength = Math.floor(progress * textLength);

          let currentText = '';

          for (let i = 0; i < textLength; i++) {
            if (i < revealedLength) {
              // Character is revealed
              currentText += originalText[i];
            } else if (i === revealedLength && progress < 1) {
              // Current character being revealed with some scrambling
              if (Math.random() > 0.7) {
                currentText += originalText[i];
              } else {
                currentText +=
                  scrambleChars[
                    Math.floor(Math.random() * scrambleChars.length)
                  ];
              }
            } else {
              // Future characters remain scrambled
              currentText +=
                scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }
          }

          if (element) {
            element.textContent = currentText;
          }
        },
        onComplete: () => {
          if (element) {
            element.textContent = originalText;
          }
        },
      }
    );

    return () => {
      timeline.kill();
    };
  }, [text, delay, duration, scrambleChars]);

  return elementRef;
};
