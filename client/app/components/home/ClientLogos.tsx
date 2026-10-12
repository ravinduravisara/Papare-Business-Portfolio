import React from 'react';
import { SectionHeading } from '../common/SectionHeading.js';
import { motion } from 'framer-motion';

const CLIENTS = [
  { name: 'Dialog Play', category: 'Gaming & Entertainment' },
  { name: 'Dialog', category: 'Telecommunications' },
  { name: 'Dialog Television', category: 'Broadcast & Media' },
  { name: 'Dialog Finance', category: 'Financial Technologies' },
  { name: 'United Motors', category: 'Automotive' },
];

export const ClientLogos: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/40 border-t border-border-custom">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <SectionHeading
          number="05"
          label="SELECTED CLIENTS"
          title="BRANDS WE WORK WITH."
          subtitle="Trusted by leading brands and enterprises across Sri Lanka."
          align="center"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-12">
          {CLIENTS.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-primary/70 border border-border-custom hover:border-accent/80 transition-all duration-300 flex flex-col items-center justify-center text-center group"
            >
              <div className="w-12 h-1 bg-border-custom group-hover:bg-accent transition-colors mb-4" />
              <h4 className="font-display font-bold text-lg md:text-xl uppercase text-white tracking-wide group-hover:text-accent transition-colors">
                {client.name}
              </h4>
              <span className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mt-2 block">
                {client.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

