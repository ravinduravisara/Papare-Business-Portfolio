import React from 'react';
import type { MetaFunction } from 'react-router';
import { ServiceHero } from '../components/service/ServiceHero.js';
import { ServiceGrid } from '../components/service/ServiceGrid.js';
import { ContactCTA } from '../components/home/ContactCTA.js';
import { useServices } from '../hooks/useServices.js';
import { buildMetaTags } from '../lib/seo.js';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Services & Capabilities | Event Management & Production Sri Lanka',
    description:
      'Explore the end-to-end capabilities of ThePapare Events: Event management, technical production, LED wall screens, creative branding, video production, and studio rentals.',
    canonical: 'https://thepapare.events/services',
  });
};

export default function ServicesPage() {
  const { services, isLoading } = useServices();

  return (
    <>
      <ServiceHero
        title="OUR CAPABILITIES & EXPERTISE."
        subtitle="End-to-end creative, technical and production capabilities coordinated seamlessly through one agency partner."
      />

      <section className="py-24 max-w-content mx-auto px-6 md:px-12">
        <ServiceGrid services={services} />
      </section>

      <ContactCTA />
    </>
  );
}

