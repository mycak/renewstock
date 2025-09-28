import React from 'react';

export const SkipNavigation: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      Skip to main content
    </a>
  );
};