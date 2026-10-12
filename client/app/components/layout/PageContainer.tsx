import React from 'react';
import { clsx } from 'clsx';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'content' | 'full' | 'narrow';
  hasHero?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  maxWidth = 'content',
  hasHero = false,
}) => {
  const widthClasses = {
    content: 'max-w-content mx-auto px-6 md:px-12',
    full: 'w-full px-6 md:px-12',
    narrow: 'max-w-4xl mx-auto px-6 md:px-12',
  };

  return (
    <main
      className={clsx(
        'w-full min-h-screen text-white',
        hasHero ? 'pt-0' : 'pt-28 md:pt-36 pb-20',
        className
      )}
    >
      <div className={widthClasses[maxWidth]}>{children}</div>
    </main>
  );
};

