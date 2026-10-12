import React from 'react';
import { Button } from '../common/Button.js';
import { RevealOnScroll } from '../common/RevealOnScroll.js';

export const ContactCTA: React.FC = () => {
  return (
    <section className="py-28 md:py-40 bg-primary border-t border-border-custom relative overflow-hidden text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <RevealOnScroll>
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block">
            // GET STARTED
          </span>
          <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-8">
            HAVE AN IDEA? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-accent">
              LET'S MAKE IT HAPPEN.
            </span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Every project begins with an idea. We bring the capabilities, creativity and coordination needed to turn that idea into reality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button to="/contact" variant="primary" arrow="diagonal" className="w-full sm:w-auto">
              START YOUR PROJECT
            </Button>
            <Button to="/services" variant="outline" arrow="diagonal" className="w-full sm:w-auto">
              EXPLORE OUR SERVICES
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

