import React from 'react';
import { clsx } from 'clsx';

export interface SkeletonProps {
  className?: string;
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({ className = 'h-6 w-full', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'animate-pulse bg-[#1c1c24] rounded border border-border-custom/40',
            className
          )}
        />
      ))}
    </>
  );
};

