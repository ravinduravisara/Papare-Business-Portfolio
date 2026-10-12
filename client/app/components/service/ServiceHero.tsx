import React from 'react';
import { motion } from 'framer-motion';

export interface ServiceHeroProps {
  title: string;
  subtitle?: string;
  category?: string;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  subtitle,
  category = 'CAPABILITIES & EXPERTISE',
}) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-border-custom bg-secondary/30">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block"
        >
          // {category}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] max-w-4xl mb-6"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-base md:text-xl max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

