import React from 'react';
import type { MetaFunction } from 'react-router';
import { PageContainer } from '../components/layout/PageContainer.js';
import { buildMetaTags } from '../lib/seo.js';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Privacy Policy | ThePapare Events',
    description: 'Privacy Policy and data governance for ThePapare Events website visitors and inquiries.',
    canonical: 'https://thepapare.events/privacy',
  });
};

export default function PrivacyPage() {
  return (
    <PageContainer maxWidth="narrow">
      <div className="space-y-8 font-sans leading-relaxed text-text-secondary">
        <div>
          <span className="font-mono text-xs uppercase text-accent font-semibold block mb-2">
            LEGAL &amp; COMPLIANCE
          </span>
          <h1 className="font-display font-bold uppercase text-3xl sm:text-4xl text-white mb-4">
            PRIVACY POLICY
          </h1>
          <p className="text-sm font-mono text-neutral-400">
            Last Updated: January 2026
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="font-display font-bold uppercase text-lg text-white">
            1. Information Collection
          </h2>
          <p className="text-sm">
            ThePapare Events collects business contact details (including name, business email, organization name, and project requirements) solely when voluntarily submitted through our project inquiry forms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display font-bold uppercase text-lg text-white">
            2. Purpose of Use
          </h2>
          <p className="text-sm">
            Information submitted is used exclusively by our internal event management, production, and accounts teams to evaluate your project scope, provide commercial proposals, and coordinate requested creative services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display font-bold uppercase text-lg text-white">
            3. Data Protection & Security
          </h2>
          <p className="text-sm">
            We employ modern security safeguards, HTTPS encryption, encrypted session management, and restricted internal access to protect your personal and commercial information against unauthorized access, loss, or disclosure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display font-bold uppercase text-lg text-white">
            4. Contact
          </h2>
          <p className="text-sm">
            If you have questions regarding this privacy policy or wish to request the removal of your inquiry data, contact us at <a href="mailto:contact@thepapare.events" className="text-accent underline">contact@thepapare.events</a>.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}

