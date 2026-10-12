import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button.js';
import { ChevronDown, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-primary pt-24 pb-16">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Background Visual Texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transform animate-pulse transition-all duration-1000"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop")',
          }}
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/60" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />

        {/* Subtle Geometric / Stage Light Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/15 blur-[140px] pointer-events-none rounded-full" />
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-content mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center">
        {/* Supporting Tag / Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-custom bg-secondary/80 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-neutral-300 font-medium">
            SRI LANKA'S PREMIER INTEGRATED EXPERIENTIAL AGENCY
          </span>
        </motion.div>

        {/* Oversized Cinematic Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.02] max-w-5xl mb-8"
        >
          EXPERIENCE <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-accent">
            BEYOND EVENTS.
          </span>
        </motion.h1>

        {/* Supporting Heading & Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-sora text-base sm:text-lg md:text-xl text-neutral-300 font-normal max-w-2xl mb-4 leading-relaxed"
        >
          An Integrated Events, Creative, Production &amp; Experiential Agency.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-sans text-sm sm:text-base text-text-secondary max-w-xl mb-12 leading-relaxed"
        >
          From concept to execution, we bring ideas to life through events, creativity, production and content.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Button to="/projects" variant="primary" arrow="diagonal" className="w-full sm:w-auto">
            EXPLORE OUR WORK
          </Button>
          <Button to="/contact" variant="outline" arrow="diagonal" className="w-full sm:w-auto">
            START A PROJECT
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 md:mt-24 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => {
            const nextSection = document.getElementById('who-we-are');
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-secondary group-hover:text-accent transition-colors">
            SCROLL TO DISCOVER
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

