import React from 'react';
import type { MetaFunction } from 'react-router';
import { PageContainer } from '../components/layout/PageContainer.js';
import { SectionHeading } from '../components/common/SectionHeading.js';
import { Button } from '../components/common/Button.js';
import { RevealOnScroll } from '../components/common/RevealOnScroll.js';
import { ContactCTA } from '../components/home/ContactCTA.js';
import { buildMetaTags } from '../lib/seo.js';
import { Layers, Lightbulb, CheckCircle, Share2, Wrench, TrendingUp, Building2, Car, Trophy, Sparkles } from 'lucide-react';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'About Us | Integrated Events & Production Agency',
    description:
      'Discover ThePapare Events. An integrated events, creative and production agency in Sri Lanka providing coordinated event management, technical production, and digital content.',
    canonical: 'https://thepapare.events/about',
  });
};

const WHY_US_ITEMS = [
  {
    icon: Layers,
    title: 'Integrated Capabilities',
    desc: 'Multiple services coordinated through one agency, simplifying project management and delivery.',
  },
  {
    icon: Lightbulb,
    title: 'Creative Thinking',
    desc: 'Ideas developed around brand objectives, audience engagement and practical execution.',
  },
  {
    icon: CheckCircle,
    title: 'End-to-End Execution',
    desc: 'Support from initial briefing and concept development through production, event delivery and post-production.',
  },
  {
    icon: Share2,
    title: 'Content Beyond the Event',
    desc: 'Opportunities to transform live experiences into photography, video, social content and additional brand assets.',
  },
  {
    icon: Wrench,
    title: 'Flexible Production Solutions',
    desc: "A combination of internal capabilities and specialist external partners, selected according to each project's requirements.",
  },
  {
    icon: TrendingUp,
    title: 'Commercially Focused Delivery',
    desc: 'Solutions designed around client objectives, budget considerations, operational feasibility and business value.',
  },
];

const INDUSTRIES = [
  { icon: Building2, name: 'Corporate & Finance', desc: 'Conferences, annual general meetings, celebrations & executive dinners.' },
  { icon: Car, name: 'Automotive Brands', desc: 'Rallies, vehicle launches, track activations & dealer gatherings.' },
  { icon: Trophy, name: 'Sports & Entertainment', desc: 'Fan parks, live screenings, tournament ceremonies & community events.' },
  { icon: Sparkles, name: 'Consumer & Retail Brands', desc: 'Pop-ups, experiential mall roadshows & interactive product reveals.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 border-b border-border-custom bg-secondary/30">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block">
            // ABOUT THEPAPARE EVENTS
          </span>
          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05] max-w-5xl mb-8">
            ONE PARTNER. <br />
            MULTIPLE CAPABILITIES. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-accent">
              END-TO-END EXECUTION.
            </span>
          </h1>
          <p className="text-text-secondary text-lg sm:text-xl max-w-3xl leading-relaxed font-sans">
            ThePapare Events is an integrated events, creative and production agency delivering end-to-end solutions for brands, businesses and organizations in Sri Lanka.
          </p>
        </div>
      </section>

      {/* Who We Are & Mission */}
      <section className="py-24 border-b border-border-custom">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6 text-text-secondary text-base md:text-lg leading-relaxed">
              <SectionHeading
                number="01"
                label="OUR IDENTITY"
                title="BRIDGING CREATIVITY & PRODUCTION."
              />
              <p>
                Our capabilities span event management, corporate gatherings, brand activations, technical production, creative development, commercials, digital content and studio services.
              </p>
              <p>
                By bringing these capabilities together, we offer clients a coordinated approach to planning, creating and executing experiences that engage audiences and deliver value to brands.
              </p>
              <p>
                Whether it is a corporate function, a large-scale event, a brand campaign, a themed celebration or a production requirement, we turn ideas into experiences through creativity, collaboration and execution.
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] border border-border-custom overflow-hidden bg-secondary">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"
                  alt="Creative Agency Briefing and Stage Setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ThePapare Events? (6 Strengths) */}
      <section className="py-24 md:py-36 bg-secondary/40 border-b border-border-custom">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <SectionHeading
            number="02"
            label="WHY THEPAPARE EVENTS"
            title="BUILT FOR RELIABILITY & SCALE."
            subtitle="Six distinct strengths that differentiate our agency's coordinated delivery model."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {WHY_US_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <RevealOnScroll key={item.title} delay={idx * 0.1}>
                  <div className="p-8 bg-primary/80 border border-border-custom hover:border-accent transition-colors h-full flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded bg-secondary border border-border-custom flex items-center justify-center mb-6 group-hover:border-accent transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-display font-bold uppercase text-lg text-white mb-3 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Work With */}
      <section className="py-24 border-b border-border-custom">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <SectionHeading
            number="03"
            label="SECTORS"
            title="INDUSTRIES WE WORK WITH."
            subtitle="Tailored creative and technical solutions designed for diverse industry demands."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              return (
                <div key={ind.name} className="p-6 bg-secondary border border-border-custom">
                  <Icon className="w-7 h-7 text-accent mb-4" />
                  <h4 className="font-display font-bold uppercase text-base text-white mb-2">
                    {ind.name}
                  </h4>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <ContactCTA />
    </>
  );
}

