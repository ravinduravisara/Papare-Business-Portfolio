import React from 'react';
import type { MetaFunction } from 'react-router';
import { StudioHero } from '../components/studio/StudioHero.js';
import { StudioServices } from '../components/studio/StudioServices.js';
import { StudioGallery } from '../components/studio/StudioGallery.js';
import { ContactCTA } from '../components/home/ContactCTA.js';
import { SectionHeading } from '../components/common/SectionHeading.js';
import { Button } from '../components/common/Button.js';
import { buildMetaTags } from '../lib/seo.js';
import { CheckCircle2, Calendar, ShieldCheck, Clock } from 'lucide-react';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'ThePapare Studios | Studio Rental & Video Production Colombo',
    description:
      'ThePapare Studios provides professional studio rental, green-screen cyclorama, video podcast suites, photography setups, and commercial media production in Sri Lanka.',
    canonical: 'https://thepapare.events/studios',
  });
};

export default function StudiosPage() {
  return (
    <>
      <StudioHero />

      {/* Overview & Intro */}
      <section className="py-20 md:py-28 max-w-content mx-auto px-6 md:px-12 border-b border-border-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-accent block">
              // STUDIO CAPABILITIES
            </span>
            <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              DEDICATED PRODUCTION ENVIRONMENTS FOR VISUAL STORYTELLING.
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed font-sans">
              ThePapare Studios extends our production capabilities by providing a dedicated environment for visual storytelling, branded content and professional media production.
            </p>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed font-sans">
              Our studio facilities support a variety of requirements, including green-screen productions, photography, video shoots, podcasts, interviews and corporate content.
            </p>
          </div>

          <div className="lg:col-span-5 bg-secondary border border-border-custom p-8 space-y-6">
            <h3 className="font-display font-bold uppercase text-lg text-white">
              STUDIO HIRE SPECIFICATIONS
            </h3>
            <div className="space-y-4 text-sm font-sans">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Flexible Booking Sessions</span>
                  <span className="text-text-secondary text-xs">Half-day (4 hours) and Full-day (8 hours) blocks.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Acoustic & Lighting Control</span>
                  <span className="text-text-secondary text-xs">Fully sound-insulated with overhead rigging.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Booking Advance Notice</span>
                  <span className="text-text-secondary text-xs">Subject to availability and production scheduling.</span>
                </div>
              </div>
            </div>

            <Button to="/contact" variant="primary" arrow="diagonal" className="w-full">
              REQUEST STUDIO AVAILABILITY
            </Button>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-20 max-w-content mx-auto px-6 md:px-12 border-b border-border-custom">
        <SectionHeading
          number="01"
          label="SERVICES"
          title="PRODUCTION ENVIRONMENTS."
          subtitle="Explore the individual services available at ThePapare Studios."
        />
        <StudioServices />
      </section>

      {/* Studio Gallery */}
      <section className="py-20 max-w-content mx-auto px-6 md:px-12">
        <SectionHeading
          number="02"
          label="FACILITIES"
          title="STUDIO GALLERY."
          subtitle="A glimpse inside our production rooms, soundstages and recording environments."
        />
        <StudioGallery />
      </section>

      <ContactCTA />
    </>
  );
}

