import React from 'react';
import { SectionHeading } from '../common/SectionHeading.js';
import { Button } from '../common/Button.js';
import { RevealOnScroll } from '../common/RevealOnScroll.js';
import { Video, Mic, Camera, MonitorPlay, Film, Sparkles } from 'lucide-react';

const STUDIO_CAPABILITIES = [
  { icon: Camera, title: 'Studio Rental', desc: 'Acoustically treated studio space with full rigging support.' },
  { icon: Video, title: 'Video Production', desc: 'Commercial shoot setups with multi-camera director monitoring.' },
  { icon: Film, title: 'Green Screen', desc: 'Infinity cyclorama green screen for virtual and VFX sets.' },
  { icon: Mic, title: 'Podcasts & Audio', desc: 'Multi-microphone broadcast podcast suite with live switching.' },
  { icon: MonitorPlay, title: 'Interviews & Shows', desc: 'Corporate executive interviews and branded conversational shows.' },
  { icon: Sparkles, title: 'Branded Content', desc: 'Rapid creation of commercial reels, product shoots, and promos.' },
];

export const StudioPreview: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-primary border-t border-border-custom relative overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <RevealOnScroll direction="right">
              <div className="relative group overflow-hidden border border-border-custom bg-secondary">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"
                  alt="ThePapare Studios Environment"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-primary/80 backdrop-blur-md border border-border-custom">
                  <span className="font-mono text-xs text-accent uppercase font-bold block mb-1">
                    FACILITIES // COLOMBO
                  </span>
                  <p className="font-display text-sm font-semibold text-white uppercase">
                    Subject to booking availability &amp; scheduling
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Information & Capabilities */}
          <div className="lg:col-span-6">
            <SectionHeading
              number="06"
              label="THEPAPARE STUDIOS"
              title="A SPACE TO CREATE."
              subtitle="ThePapare Studios extends our production capabilities by providing a dedicated environment for visual storytelling, branded content and professional media production."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              {STUDIO_CAPABILITIES.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.title} className="p-4 bg-secondary border border-border-custom hover:border-accent transition-colors">
                    <Icon className="w-5 h-5 text-accent mb-2" />
                    <h4 className="font-display font-bold text-sm uppercase text-white mb-1">
                      {cap.title}
                    </h4>
                    <p className="text-text-secondary text-xs leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <Button to="/studios" variant="primary" arrow="diagonal">
              EXPLORE THE STUDIO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

