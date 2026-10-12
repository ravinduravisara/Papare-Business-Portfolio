import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

export const ProjectGallery: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-12">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className="group relative aspect-[4/3] bg-primary border border-border-custom overflow-hidden cursor-pointer"
          >
            <img
              src={img}
              alt={`${title} Production Visual ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-accent p-2"
            aria-label="Close Preview"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt={title}
            className="max-w-full max-h-[90vh] object-contain border border-border-custom"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

