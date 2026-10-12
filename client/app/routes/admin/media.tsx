import React from 'react';
import type { MetaFunction } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api.js';
import { AdminSidebar } from '../../components/admin/AdminSidebar.js';
import { AdminHeader } from '../../components/admin/AdminHeader.js';
import { ImageUploader } from '../../components/admin/ImageUploader.js';
import { Trash2, Copy, Check } from 'lucide-react';
import { buildMetaTags } from '../../lib/seo.js';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Media Library | Admin',
    noindex: true,
  });
};

export default function AdminMediaPage() {
  const queryClient = useQueryClient();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const { data: mediaList = [], isLoading } = useQuery({
    queryKey: ['admin', 'media'],
    queryFn: () => api.getAdminMedia(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'media'] });
    },
  });

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-screen bg-primary text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <AdminHeader
          title="MEDIA LIBRARY"
          description="Upload and manage Cloudinary visual assets and photography."
        />

        {/* Upload Zone */}
        <div className="mb-12 p-6 bg-secondary border border-border-custom max-w-xl">
          <ImageUploader
            label="Upload New Media Asset"
            onUploadSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['admin', 'media'] });
            }}
          />
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaList.map((media) => (
            <div
              key={media._id || media.id}
              className="group relative bg-secondary border border-border-custom overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-square bg-primary overflow-hidden relative">
                {media.resourceType === 'video' ? (
                  <video
                    src={media.publicUrl}
                    className="w-full h-full object-cover"
                    controls={false}
                  />
                ) : (
                  <img
                    src={media.publicUrl}
                    alt={media.altText || media.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}

                <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleCopy(media.publicUrl, media._id || media.id!)}
                    className="p-2 bg-secondary text-white hover:text-accent border border-border-custom"
                    title="Copy URL"
                  >
                    {copiedId === (media._id || media.id) ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete media asset?')) {
                        deleteMutation.mutate(media._id || media.id!);
                      }
                    }}
                    className="p-2 bg-secondary text-red-400 hover:text-red-300 border border-border-custom"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-2.5 text-center">
                <span className="text-[11px] font-mono text-neutral-300 truncate block">
                  {media.title || media.altText || 'Media Asset'}
                </span>
                <span className="text-[9px] font-mono text-text-secondary uppercase block">
                  {media.fileFormat} • {(media.fileSize / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

