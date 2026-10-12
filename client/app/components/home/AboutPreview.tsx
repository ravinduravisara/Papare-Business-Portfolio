import React from 'react';
import { SectionHeading } from '../common/SectionHeading.js';
import { Button } from '../common/Button.js';
import { RevealOnScroll } from '../common/RevealOnScroll.js';
import { CheckCircle2 } from 'lucide-react';

export const AboutPreview: React.FC = () => {
  return (
    <section id="who-we-are" className="py-24 md:py-36 bg-secondary/50 border-t border-border-custom relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Capabilities */}
          <div className="lg:col-span-7">
            <SectionHeading
              number="01"
              label="WHO WE ARE"
              title="WE CREATE EXPERIENCES THAT GO BEYOND EVENTS."
              subtitle="ThePapare Events is an integrated events, creative and production agency delivering end-to-end solutions for brands, businesses and organizations."
            />

            <RevealOnScroll delay={0.2} className="space-y-6 text-text-secondary text-base md:text-lg leading-relaxed">
              <p>
                Our capabilities span event management, corporate gatherings, brand activations, technical production, creative development, commercials, digital content and studio services.
              </p>
              <p>
                By bringing these capabilities together, we offer clients a coordinated approach to planning, creating and executing experiences that engage audiences and deliver value to brands.
              </p>
              <p>
                Whether it is a corporate function, a large-scale event, a brand campaign, a themed celebration or a production requirement, we turn ideas into experiences through creativity, collaboration and execution.
              </p>
            </RevealOnScroll>

            {/* Core Brand Pillars */}
            <RevealOnScroll delay={0.3} className="pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border-custom">
                <div className="p-4 bg-primary/60 border border-border-custom">
                  <span className="font-mono text-xs text-accent uppercase tracking-wider block mb-1">// 01</span>
                  <span className="font-display font-bold text-sm uppercase text-white block">ONE PARTNER.</span>
                </div>
                <div className="p-4 bg-primary/60 border border-border-custom">
                  <span className="font-mono text-xs text-accent uppercase tracking-wider block mb-1">// 02</span>
                  <span className="font-display font-bold text-sm uppercase text-white block">MULTIPLE CAPABILITIES.</span>
                </div>
                <div className="p-4 bg-primary/60 border border-border-custom">
                  <span className="font-mono text-xs text-accent uppercase tracking-wider block mb-1">// 03</span>
                  <span className="font-display font-bold text-sm uppercase text-white block">END-TO-END EXECUTION.</span>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4} className="pt-10">
              <Button to="/about" variant="primary" arrow="diagonal">
                DISCOVER OUR AGENCY
              </Button>
            </RevealOnScroll>
          </div>

          {/* Right Column: Imagery & Visual Composition */}
          <div className="lg:col-span-5 relative">
            <RevealOnScroll direction="left" delay={0.2}>
              <div className="relative group">
                {/* Main Image */}
                <div className="relative aspect-[4/5] overflow-hidden border border-border-custom bg-secondary">
                  <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop"
                    alt="ThePapare Events Production Atmosphere"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
                </div>

                {/* Overlaid Badge */}
                <div className="absolute -bottom-6 -left-6 bg-primary border border-border-custom p-6 max-w-xs shadow-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span className="font-display font-bold text-sm uppercase text-white">
                      FULL SPECTRUM DELIVERY
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Strategy, creative concept, technical staging and post-event media unified under one agency.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

