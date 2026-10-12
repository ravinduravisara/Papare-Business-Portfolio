import React from 'react';
import { SectionHeading } from '../common/SectionHeading.js';
import { motion } from 'framer-motion';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'DISCOVER',
    desc: 'Understand the brief, objectives, audience, budget and requirements.',
  },
  {
    num: '02',
    title: 'DEVELOP',
    desc: 'Create the concept, creative direction, proposed scope and commercial solution.',
  },
  {
    num: '03',
    title: 'PLAN',
    desc: 'Coordinate timelines, budgets, production requirements, suppliers and resources.',
  },
  {
    num: '04',
    title: 'EXECUTE',
    desc: 'Manage production, event delivery and on-ground implementation.',
  },
  {
    num: '05',
    title: 'EXTEND',
    desc: 'Develop relevant photography, video, digital content and campaign assets to extend the experience.',
  },
];

export const WorkProcess: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-secondary/30 border-t border-border-custom relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <SectionHeading
          number="07"
          label="OUR PROCESS"
          title="FROM AN IDEA TO AN EXPERIENCE."
          subtitle="Our five-stage delivery framework ensures creative precision and flawless on-ground execution."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-16">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative p-6 md:p-8 bg-primary/80 border border-border-custom flex flex-col justify-between group hover:border-accent transition-colors"
            >
              <div>
                <span className="font-mono text-xl font-bold text-accent mb-6 block">
                  {step.num}
                </span>
                <h3 className="font-display font-bold uppercase text-lg sm:text-xl text-white mb-3 group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border-custom/50 flex items-center justify-between">
                <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">
                  STAGE {step.num}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

