import React from 'react';
import { Link } from 'react-router';
import { SectionHeading } from '../common/SectionHeading.js';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SERVICES_DATA = [
  {
    num: '01',
    title: 'EVENTS & EXPERIENCES',
    desc: 'We conceptualize, plan and execute events that bring people, brands and experiences together.',
    href: '/services/events-experiences',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '02',
    title: 'EVENT PRODUCTION & TECHNICAL SOLUTIONS',
    desc: 'Technical and production solutions designed to transform event concepts into impactful experiences.',
    href: '/services/event-production',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '03',
    title: 'CREATIVE & BRAND SOLUTIONS',
    desc: 'Creative ideas and visual solutions that help brands communicate, connect and stand out.',
    href: '/services/creative-brand-solutions',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '04',
    title: 'VIDEO & MEDIA PRODUCTION',
    desc: 'Visual storytelling for commercials, corporate communication, campaigns and branded experiences.',
    href: '/services/video-media-production',
    image: 'https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '05',
    title: 'SOCIAL & DIGITAL CONTENT',
    desc: 'Digital storytelling and content that extends brand experiences beyond physical events.',
    href: '/services/social-digital-content',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '06',
    title: 'STUDIO & PRODUCTION FACILITIES',
    desc: 'Dedicated production environments and supporting services for professional creative projects.',
    href: '/services/studio-production',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
  },
];

export const ServicesPreview: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-primary border-t border-border-custom relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <SectionHeading
            number="02"
            label="WHAT WE DO"
            title="ONE AGENCY. ENDLESS POSSIBILITIES."
            subtitle="Explore our integrated creative, event, production and digital capabilities."
            className="mb-0"
          />
          <Link
            to="/services"
            className="mt-6 md:mt-0 font-display text-xs uppercase tracking-widest text-accent hover:text-white inline-flex items-center gap-1 font-semibold group shrink-0"
          >
            <span>VIEW ALL SERVICES</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link
                to={service.href}
                className="group relative block h-full bg-secondary border border-border-custom overflow-hidden transition-all duration-300 hover:border-accent hover:-translate-y-1.5"
              >
                {/* Background Image Container with Overlay */}
                <div className="relative h-56 overflow-hidden bg-primary">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-xs uppercase font-bold px-2.5 py-1 bg-primary/80 border border-border-custom text-accent">
                    {service.num}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display uppercase text-lg md:text-xl font-bold text-white mb-3 tracking-tight group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-border-custom/60 flex items-center justify-between text-xs font-display font-semibold uppercase tracking-wider text-neutral-300 group-hover:text-white">
                    <span>EXPLORE CAPABILITIES</span>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-border-custom group-hover:bg-accent group-hover:border-accent transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

