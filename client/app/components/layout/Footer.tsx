import React from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary border-t border-border-custom text-white pt-20 pb-12">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Top Branding Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-border-custom">
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-accent flex items-center justify-center font-display font-black text-white text-xl">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-wider text-white uppercase leading-none">
                  THEPAPARE
                </span>
                <span className="font-mono text-[10px] tracking-[0.28em] text-accent font-semibold uppercase leading-tight mt-0.5">
                  EVENTS
                </span>
              </div>
            </Link>

            <p className="font-display text-lg text-white font-semibold">
              EXPERIENCE BEYOND EVENTS.
            </p>

            <p className="text-text-secondary text-sm leading-relaxed max-w-md font-sans">
              ThePapare Events is an integrated events, creative and production agency delivering end-to-end solutions for brands, businesses and organizations in Sri Lanka.
            </p>

            <div className="pt-2 text-xs font-mono text-accent uppercase tracking-wider font-semibold">
              One partner. Multiple capabilities. End-to-end execution.
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
              // EXPLORE
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-neutral-300 hover:text-white transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/studios" className="text-neutral-300 hover:text-white transition-colors">
                  ThePapare Studios
                </Link>
              </li>
              <li>
                <Link to="/our-approach" className="text-neutral-300 hover:text-white transition-colors">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
              // EXPERTISE
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <Link to="/services/events-experiences" className="text-neutral-300 hover:text-white transition-colors">
                  Events & Experiences
                </Link>
              </li>
              <li>
                <Link to="/services/event-production" className="text-neutral-300 hover:text-white transition-colors">
                  Event Production & Technical
                </Link>
              </li>
              <li>
                <Link to="/services/creative-brand-solutions" className="text-neutral-300 hover:text-white transition-colors">
                  Creative & Brand Solutions
                </Link>
              </li>
              <li>
                <Link to="/services/video-media-production" className="text-neutral-300 hover:text-white transition-colors">
                  Video & Media Production
                </Link>
              </li>
              <li>
                <Link to="/services/social-digital-content" className="text-neutral-300 hover:text-white transition-colors">
                  Social & Digital Content
                </Link>
              </li>
              <li>
                <Link to="/services/studio-production" className="text-neutral-300 hover:text-white transition-colors">
                  Studio & Facilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
              // CONTACT
            </h4>
            <div className="space-y-3 text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Colombo, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:contact@thepapare.events" className="hover:text-white transition-colors">
                  contact@thepapare.events
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+94 11 234 5678</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center text-xs font-display font-semibold uppercase tracking-wider text-accent hover:text-white transition-colors group"
              >
                <span>INITIATE AN INQUIRY</span>
                <ArrowUpRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-text-secondary font-sans gap-4">
          <div>
            &copy; {new Date().getFullYear()} ThePapare Events. All rights reserved. Primary location: Sri Lanka.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="opacity-30">•</span>
            <Link to="/admin/login" className="hover:text-white transition-colors">
              Agency Management
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

