import React from 'react';
import type { MetaFunction } from 'react-router';
import { HeroSection } from '../components/home/HeroSection.js';
import { AboutPreview } from '../components/home/AboutPreview.js';
import { ServicesPreview } from '../components/home/ServicesPreview.js';
import { FeaturedProjects } from '../components/home/FeaturedProjects.js';
import { IntegratedApproach } from '../components/home/IntegratedApproach.js';
import { ClientLogos } from '../components/home/ClientLogos.js';
import { StudioPreview } from '../components/home/StudioPreview.js';
import { WorkProcess } from '../components/home/WorkProcess.js';
import { ContactCTA } from '../components/home/ContactCTA.js';
import { buildMetaTags, generateOrganizationSchema } from '../lib/seo.js';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Experience Beyond Events',
    description:
      'ThePapare Events is an integrated events, creative, production and experiential agency delivering end-to-end solutions for brands and organizations in Sri Lanka.',
    canonical: 'https://thepapare.events/',
  });
};

export default function HomePage() {
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <div className="w-full overflow-hidden">
        <HeroSection />
        <AboutPreview />
        <ServicesPreview />
        <FeaturedProjects />
        <IntegratedApproach />
        <ClientLogos />
        <StudioPreview />
        <WorkProcess />
        <ContactCTA />
      </div>
    </>
  );
}

