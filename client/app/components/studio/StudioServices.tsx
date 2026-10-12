import React from 'react';
import { Camera, Video, Film, Mic, Users, Tv } from 'lucide-react';

const STUDIO_SERVICES = [
  {
    icon: Camera,
    title: 'Studio Rental',
    desc: 'Spacious, acoustically treated studio environment available for half-day or full-day production hires with supporting crew options.',
  },
  {
    icon: Video,
    title: 'Video Production',
    desc: 'End-to-end commercial filming setups, presenter-led programs, educational content and corporate communications.',
  },
  {
    icon: Film,
    title: 'Green Screen',
    desc: 'Seamless cyclorama green-screen environment designed for virtual productions, live keying and composite visual effects.',
  },
  {
    icon: Mic,
    title: 'Podcasts & Voice',
    desc: 'Dedicated sound-proof podcast lounge equipped with broadcast-grade Shure mics, multi-cam switching and live monitoring.',
  },
  {
    icon: Users,
    title: 'Interviews & Panels',
    desc: 'Modular interview configurations suitable for executive fireside chats, panel discussions and customer success stories.',
  },
  {
    icon: Tv,
    title: 'Branded Content',
    desc: 'Rapid production pipeline for commercial social campaigns, product demonstrations, teasers and influencer collaborations.',
  },
];

export const StudioServices: React.FC = () => {
  return (
    <div className="my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {STUDIO_SERVICES.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="p-8 bg-secondary border border-border-custom hover:border-accent transition-colors flex flex-col justify-between"
            >
              <div>
                <Icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-display uppercase text-lg font-bold text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-custom/50 text-[11px] font-mono text-accent uppercase">
                Subject to scheduling
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

