import React, { useState } from 'react';
import type { MetaFunction } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api.js';
import { AdminSidebar } from '../../components/admin/AdminSidebar.js';
import { AdminHeader } from '../../components/admin/AdminHeader.js';
import type { ServiceDTO } from '@thepapare/shared';
import { Edit, Save, X, Plus } from 'lucide-react';
import { buildMetaTags } from '../../lib/seo.js';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Service Management | Admin',
    noindex: true,
  });
};

export default function AdminServicesPage() {
  const queryClient = useQueryClient();
  const [editingService, setEditingService] = useState<ServiceDTO | null>(null);
  const [capabilitiesInput, setCapabilitiesInput] = useState('');

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['admin', 'services'],
    queryFn: () => api.getAdminServices(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ServiceDTO> }) => api.updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      setEditingService(null);
    },
  });

  const handleEditClick = (service: ServiceDTO) => {
    setEditingService({ ...service });
    setCapabilitiesInput(service.capabilities.join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    const id = editingService._id || editingService.id;
    if (!id) return;

    const capabilities = capabilitiesInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    await updateMutation.mutateAsync({
      id,
      data: {
        ...editingService,
        capabilities,
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-primary text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <AdminHeader
          title="SERVICE MANAGEMENT"
          description="Manage agency capabilities, descriptions, and displayed order."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc._id || svc.id}
              className="p-6 bg-secondary border border-border-custom flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-accent font-semibold">
                    ORDER // {svc.displayOrder}
                  </span>
                  <button
                    onClick={() => handleEditClick(svc)}
                    className="p-1 text-neutral-400 hover:text-white"
                    title="Edit Service Content"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-display font-bold uppercase text-lg text-white mb-2">
                  {svc.title}
                </h3>
                <p className="text-text-secondary text-xs leading-relaxed mb-4 line-clamp-3">
                  {svc.shortDescription}
                </p>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-accent uppercase font-semibold block">
                    Capabilities ({svc.capabilities.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {svc.capabilities.slice(0, 3).map((c) => (
                      <span key={c} className="text-[10px] bg-primary px-1.5 py-0.5 border border-border-custom text-neutral-300">
                        {c}
                      </span>
                    ))}
                    {svc.capabilities.length > 3 && (
                      <span className="text-[10px] text-text-secondary">
                        +{svc.capabilities.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-border-custom/50 flex justify-between items-center text-xs font-mono text-text-secondary">
                <span>/{svc.slug}</span>
                <span className="text-emerald-400 font-semibold">Published</span>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Service Modal */}
        {editingService && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-secondary border border-border-custom max-w-2xl w-full p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-border-custom mb-6">
                <div>
                  <span className="font-mono text-xs text-accent uppercase">
                    SERVICE // {editingService.slug}
                  </span>
                  <h2 className="font-display font-bold uppercase text-xl text-white mt-0.5">
                    Edit {editingService.title}
                  </h2>
                </div>
                <button onClick={() => setEditingService(null)} className="text-neutral-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                    Service Title
                  </label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    required
                    className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingService.shortDescription}
                    onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                    required
                    className="w-full bg-primary border border-border-custom px-4 py-2 text-sm text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                    Full Description
                  </label>
                  <textarea
                    rows={4}
                    value={editingService.fullDescription}
                    onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                    required
                    className="w-full bg-primary border border-border-custom px-4 py-2 text-sm text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                    Capabilities (Comma-separated)
                  </label>
                  <textarea
                    rows={3}
                    value={capabilitiesInput}
                    onChange={(e) => setCapabilitiesInput(e.target.value)}
                    required
                    className="w-full bg-primary border border-border-custom px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border-custom">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-5 py-2 border border-border-custom text-xs font-display font-semibold uppercase text-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-accent hover:bg-[#d62839] text-white text-xs font-display font-semibold uppercase flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Service</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

