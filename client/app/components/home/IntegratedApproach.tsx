import React from 'react';
import { SectionHeading } from '../common/SectionHeading.js';
import { motion } from 'framer-motion';

const APPROACH_STEPS = [
  { step: '01', title: 'STRATEGY', desc: 'Aligning business objectives, target audience insights, and commercial goals.' },
  { step: '02', title: 'CONCEPT', desc: 'Developing immersive themes, architectural narratives, and spatial concepts.' },
  { step: '03', title: 'CREATIVE', desc: 'Designing brand graphics, visual identities, stage renders, and digital art.' },
  { step: '04', title: 'PRODUCTION', desc: 'Engineering LED displays, stage fabrication, acoustic sound, and light.' },
  { step: '05', title: 'EXPERIENCE', desc: 'Meticulous on-ground event delivery, show running, and crowd immersion.' },
  { step: '06', title: 'CONTENT', desc: 'Commercial filming, high-res photography, interviews, and aftermovies.' },
  { step: '07', title: 'DIGITAL REACH', desc: 'Multi-platform social distribution, viral reels, and lasting brand equity.' },
];

export const IntegratedApproach: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-primary border-t border-border-custom relative overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <SectionHeading
          number="04"
          label="HOW WE THINK"
          title="CONNECTED THINKING. SEAMLESS EXECUTION."
          subtitle="One seamless continuum from initial brand strategy to lasting digital resonance."
          align="center"
        />

        {/* Process Flow Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {APPROACH_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative p-6 bg-secondary border border-border-custom hover:border-accent transition-colors flex flex-col justify-between group"
            >
              <div>
                <span className="font-mono text-xs text-accent font-bold block mb-3">
                  {item.step}
                </span>
                <h3 className="font-display font-bold uppercase text-base sm:text-lg text-white mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {idx < APPROACH_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-primary border border-border-custom text-[10px] text-accent text-center leading-[18px]">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

