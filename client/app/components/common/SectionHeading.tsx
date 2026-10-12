import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export interface SectionHeadingProps {
  number?: string;
  label?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  label,
  title,
  subtitle,
  description,
  align = 'left',
  className,
  light = false,
}) => {
  return (
    <div
      className={clsx(
        'relative mb-12 md:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-4xl',
        className
      )}
    >
      {/* Category / Number Tracker */}
      {(number || label) && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={clsx(
            'inline-flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest uppercase mb-4',
            light ? 'text-accent' : 'text-accent'
          )}
        >
          {number && <span className="font-semibold">{number}</span>}
          {number && label && <span className="opacity-40">/</span>}
          {label && <span className="tracking-widest">{label}</span>}
        </motion.div>
      )}

      {/* Main Cinematic Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={clsx(
          'font-display uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6',
          light ? 'text-primary' : 'text-white'
        )}
      >
        {title}
      </motion.h2>

      {/* Subtitle if provided */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={clsx(
            'text-lg md:text-xl font-sora font-medium mb-4',
            light ? 'text-neutral-800' : 'text-neutral-300'
          )}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Paragraph Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className={clsx(
            'text-base md:text-lg leading-relaxed font-sans',
            light ? 'text-neutral-600' : 'text-text-secondary'
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

