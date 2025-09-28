import { SplitText } from 'gsap/SplitText';

/**
 * Removes ARIA attributes that SplitText might have added to improve accessibility.
 * SplitText sometimes adds aria-label and aria-hidden attributes that can interfere
 * with screen readers and accessibility tools.
 *
 * @param element - The HTML element that was split by SplitText
 * @param splitInstance - The SplitText instance containing the split words/characters
 */
export const cleanupSplitTextAria = (
  element: HTMLElement,
  splitInstance: ReturnType<typeof SplitText.create>
) => {
  // Remove ARIA attributes from the main element
  element.removeAttribute('aria-label');
  element.removeAttribute('aria-hidden');

  // Remove ARIA attributes from all split words
  splitInstance.words?.forEach((word: Element) => {
    word.removeAttribute('aria-label');
    word.removeAttribute('aria-hidden');
  });

  // Remove ARIA attributes from all split characters if they exist
  splitInstance.chars?.forEach((char: Element) => {
    char.removeAttribute('aria-label');
    char.removeAttribute('aria-hidden');
  });
};
