import React from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import type { ServiceDTO } from '@thepapare/shared';

export const ServiceCard: React.FC<{ service: ServiceDTO; index: number }> = ({ service, index }) => {
  return (
    <div className="group relative bg-secondary border border-border-custom overflow-hidden transition-all duration-300 hover:border-accent hover:-translate-y-1.5 flex flex-col justify-between">
      <div className="relative h-64 overflow-hidden bg-primary">
        <img
          src={service.featuredImage}
          alt={service.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
        <span className="absolute top-4 left-4 font-mono text-xs uppercase font-bold px-2.5 py-1 bg-primary/80 border border-border-custom text-accent">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-display uppercase text-xl font-bold text-white mb-3 tracking-tight group-hover:text-accent transition-colors">
            {service.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            {service.shortDescription}
          </p>

          <div className="space-y-1.5 mb-8">
            <span className="font-mono text-[11px] text-accent font-semibold uppercase tracking-wider block">
              // SELECTED CAPABILITIES
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {service.capabilities.slice(0, 4).map((cap) => (
                <span
                  key={cap}
                  className="text-xs bg-primary/70 text-neutral-300 border border-border-custom px-2 py-0.5"
                >
                  {cap}
                </span>
              ))}
              {service.capabilities.length > 4 && (
                <span className="text-xs text-text-secondary px-1 py-0.5">
                  +{service.capabilities.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        <Link
          to={`/services/${service.slug}`}
          className="pt-4 border-t border-border-custom/60 flex items-center justify-between text-xs font-display font-semibold uppercase tracking-wider text-neutral-300 group-hover:text-white"
        >
          <span>VIEW SERVICE DETAILS</span>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-border-custom group-hover:bg-accent group-hover:border-accent transition-colors">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export const ServiceGrid: React.FC<{ services: ServiceDTO[] }> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <ServiceCard key={service.slug} service={service} index={index} />
      ))}
    </div>
  );
};

