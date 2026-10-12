import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';

const STUDIO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop',
    title: 'Main Soundstage & Rigging Floor',
  },
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
    title: 'Multi-Camera Commercial Setup',
  },
  {
    url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop',
    title: 'Broadcast Podcast Suite',
  },
  {
    url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1000&auto=format&fit=crop',
    title: 'Control Room & Audio Monitoring',
  },
];

export const StudioGallery: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-12">
        {STUDIO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImage(img.url)}
            className="group relative aspect-[16/10] overflow-hidden border border-border-custom bg-secondary cursor-pointer"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent flex items-end p-6">
              <span className="font-display font-bold uppercase text-sm text-white">
                {img.title}
              </span>
            </div>
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary/80 border border-border-custom flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4 text-accent" />
            </div>
          </div>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-white hover:text-accent p-2"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={activeImage}
            alt="Studio High-Res Preview"
            className="max-w-full max-h-[90vh] object-contain border border-border-custom"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

