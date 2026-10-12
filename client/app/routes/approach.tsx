import React from 'react';
import type { MetaFunction } from 'react-router';
import { SectionHeading } from '../components/common/SectionHeading.js';
import { ContactCTA } from '../components/home/ContactCTA.js';
import { buildMetaTags } from '../lib/seo.js';
import { motion } from 'framer-motion';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Our Approach | Integrated Event Methodology',
    description:
      'Learn how ThePapare Events connects strategy, concept, technical production, and digital amplification through our five-stage delivery framework.',
    canonical: 'https://thepapare.events/our-approach',
  });
};

const STAGES = [
  {
    step: '01',
    name: 'DISCOVER',
    heading: 'Understanding the Brief & Brand Objectives',
    description: 'We listen carefully to understand the brief, core objectives, audience profile, budget parameters, and business milestones.',
    deliverables: ['Stakeholder alignment', 'Audience research', 'Technical venue feasibility', 'Commercial parameters'],
  },
  {
    step: '02',
    name: 'DEVELOP',
    heading: 'Concept, Creative Direction & Architecture',
    description: 'Our creative team creates the overarching event theme, visual direction, spatial floorplan, and proposed solution.',
    deliverables: ['Thematic concept presentation', '3D stage & spatial renders', 'Scope architecture', 'Proposal formulation'],
  },
  {
    step: '03',
    name: 'PLAN',
    heading: 'Technical Coordination & Resource Logistics',
    description: 'We coordinate timelines, budgets, suppliers, structural fabrication, technical specifications, and production resources.',
    deliverables: ['Detailed production schedule', 'Audio-visual run sheets', 'Vendor coordination', 'Safety & compliance planning'],
  },
  {
    step: '04',
    name: 'EXECUTE',
    heading: 'On-Ground Show Control & Event Delivery',
    description: 'On event day, our senior event directors and technical producers oversee construction, rehearsals, and live execution.',
    deliverables: ['On-site build & staging', 'Show running & cue calling', 'Guest journey management', 'Live troubleshooting'],
  },
  {
    step: '05',
    name: 'EXTEND',
    heading: 'Media Capture & Ongoing Digital Reach',
    description: 'We capture the experience through photography, video, social content, and digital assets to extend the campaign.',
    deliverables: ['Event highlight film', 'Commercial photography suite', 'Short-form social reels', 'Campaign post-analysis'],
  },
];

export default function ApproachPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border-custom bg-secondary/30">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block">
            // OUR METHODOLOGY
          </span>
          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05] max-w-5xl mb-8">
            FROM STRATEGY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-accent">
              TO EXPERIENCE.
            </span>
          </h1>
          <p className="text-text-secondary text-lg sm:text-xl max-w-3xl leading-relaxed font-sans">
            Connected thinking and seamless execution. We integrate strategic planning, cutting-edge production and digital reach into a unified journey.
          </p>
        </div>
      </section>

      {/* Continuum Ribbon */}
      <section className="py-12 bg-primary border-b border-border-custom overflow-x-auto">
        <div className="max-w-content mx-auto px-6 md:px-12 flex items-center gap-3 min-w-[700px]">
          {['STRATEGY', 'CONCEPT', 'CREATIVE', 'PRODUCTION', 'EXPERIENCE', 'CONTENT', 'DIGITAL REACH'].map(
            (item, index, arr) => (
              <React.Fragment key={item}>
                <span className="font-display font-bold uppercase text-xs tracking-wider text-white px-3 py-1.5 bg-secondary border border-border-custom">
                  {item}
                </span>
                {index < arr.length - 1 && <span className="text-accent font-bold">→</span>}
              </React.Fragment>
            )
          )}
        </div>
      </section>

      {/* 5 Delivery Stages */}
      <section className="py-24 max-w-content mx-auto px-6 md:px-12">
        <SectionHeading
          number="01"
          label="DELIVERY BLUEPRINT"
          title="FIVE STAGES OF EXECUTION."
          subtitle="Every project follows our systematic roadmap from initial brief to post-event resonance."
        />

        <div className="space-y-12 mt-16">
          {STAGES.map((stage) => (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 md:p-12 bg-secondary border border-border-custom hover:border-accent transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-3">
                  <span className="font-mono text-3xl md:text-4xl font-extrabold text-accent block mb-2">
                    {stage.step}
                  </span>
                  <h3 className="font-display font-bold uppercase text-2xl text-white">
                    {stage.name}
                  </h3>
                </div>

                <div className="lg:col-span-9 space-y-6">
                  <h4 className="font-display text-lg sm:text-xl font-semibold text-white uppercase">
                    {stage.heading}
                  </h4>
                  <p className="text-text-secondary text-base leading-relaxed font-sans">
                    {stage.description}
                  </p>

                  <div className="pt-4 border-t border-border-custom/60">
                    <span className="font-mono text-xs uppercase text-accent font-semibold block mb-3">
                      KEY DELIVERABLES &amp; ACTIONS:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-neutral-300 font-sans">
                      {stage.deliverables.map((del) => (
                        <div key={del} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

