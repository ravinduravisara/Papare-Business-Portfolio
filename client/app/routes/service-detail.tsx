import React from 'react';
import { useParams, Link } from 'react-router';
import type { MetaFunction } from 'react-router';
import { useServiceDetail, useServices } from '../hooks/useServices.js';
import { useProjects } from '../hooks/useProjects.js';
import { ServiceHero } from '../components/service/ServiceHero.js';
import { ProjectCard } from '../components/project/ProjectCard.js';
import { ContactCTA } from '../components/home/ContactCTA.js';
import { Button } from '../components/common/Button.js';
import { buildMetaTags, generateServiceSchema } from '../lib/seo.js';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

export const meta: MetaFunction = ({ params }) => {
  const slug = params.slug || '';
  return buildMetaTags({
    title: slug
      ? `${slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} | ThePapare Events`
      : 'Service Details',
    canonical: `https://thepapare.events/services/${slug}`,
  });
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading } = useServiceDetail(slug || '');
  const { services } = useServices();
  const { projects } = useProjects();

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-primary">
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-3">
          Service Not Found
        </h2>
        <p className="text-text-secondary max-w-md mb-8">
          The requested service could not be located. It may have been relocated or updated.
        </p>
        <Button to="/services" variant="primary" arrow="horizontal">
          Back to Services
        </Button>
      </div>
    );
  }

  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const serviceSchema = generateServiceSchema(
    service.title,
    service.shortDescription,
    `https://thepapare.events/services/${service.slug}`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <ServiceHero
        title={service.title}
        subtitle={service.shortDescription}
        category="SERVICE CAPABILITY"
      />

      {/* Main Service Content */}
      <section className="py-20 md:py-28 max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Full Description & Capabilities */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent mb-3 block">
                // OVERVIEW & SCOPE
              </span>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-sans whitespace-pre-line">
                {service.fullDescription}
              </p>
            </div>

            {/* Capabilities List */}
            <div className="pt-8 border-t border-border-custom">
              <span className="font-mono text-xs uppercase tracking-widest text-accent mb-6 block">
                // DETAILED CAPABILITIES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.capabilities.map((cap) => (
                  <div
                    key={cap}
                    className="flex items-start gap-3 p-4 bg-secondary border border-border-custom hover:border-accent transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm font-display font-medium text-white uppercase">
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supporting Images */}
            {service.supportingImages && service.supportingImages.length > 0 && (
              <div className="pt-8 border-t border-border-custom space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-accent block">
                  // PRODUCTION MEDIA
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.supportingImages.map((img, i) => (
                    <div key={i} className="aspect-[16/10] bg-secondary border border-border-custom overflow-hidden">
                      <img
                        src={img}
                        alt={`${service.title} Production Reference ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Inquiry Box & Related Services */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-secondary border border-border-custom relative overflow-hidden">
              <span className="font-mono text-xs uppercase text-accent font-bold block mb-2">
                PROJECT INQUIRY
              </span>
              <h3 className="font-display font-bold uppercase text-xl text-white mb-4">
                Ready to plan your {service.title}?
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Reach out to our creative and production specialists to discuss your scope, concept and timeline.
              </p>
              <Button to="/contact" variant="primary" arrow="diagonal" className="w-full">
                INITIATE PROJECT
              </Button>
            </div>

            {/* Related Services Links */}
            <div className="p-8 bg-primary border border-border-custom space-y-4">
              <span className="font-mono text-xs uppercase text-text-secondary tracking-widest block">
                OTHER CAPABILITIES
              </span>
              <ul className="space-y-3">
                {relatedServices.map((rel) => (
                  <li key={rel.slug}>
                    <Link
                      to={`/services/${rel.slug}`}
                      className="group flex items-center justify-between text-sm font-display font-semibold uppercase text-neutral-300 hover:text-white"
                    >
                      <span className="group-hover:text-accent transition-colors">{rel.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

