import React from 'react';
import { motion } from 'framer-motion';

export interface ProjectHeroProps {
  title: string;
  category?: string;
  status?: string;
  client?: string;
  description?: string;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  category,
  status,
  client,
  description,
}) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-border-custom bg-secondary/30">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {category && (
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold px-3 py-1 bg-primary border border-border-custom">
              {category}
            </span>
          )}
          {status && (
            <span className={`font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 border ${
              status === 'Proposed Concept'
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'bg-accent/10 text-accent border-accent/30'
            }`}>
              {status}
            </span>
          )}
          {client && (
            <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
              CLIENT // {client}
            </span>
          )}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] max-w-5xl mb-6"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-base md:text-xl max-w-3xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
};

