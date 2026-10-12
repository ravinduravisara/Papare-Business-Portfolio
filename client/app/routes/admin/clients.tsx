import React, { useState } from 'react';
import type { MetaFunction } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api.js';
import { AdminSidebar } from '../../components/admin/AdminSidebar.js';
import { AdminHeader } from '../../components/admin/AdminHeader.js';
import type { ClientDTO } from '@thepapare/shared';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';
import { buildMetaTags } from '../../lib/seo.js';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Client Management | Admin',
    noindex: true,
  });
};

export default function AdminClientsPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Partial<ClientDTO> | null>(null);

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['admin', 'clients'],
    queryFn: () => api.getAdminClients(),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<ClientDTO>) => api.createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'clients'] });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ClientDTO> }) => api.updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'clients'] });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'clients'] });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient || !editingClient.name) return;

    if (editingClient._id || editingClient.id) {
      await updateMutation.mutateAsync({
        id: editingClient._id || editingClient.id!,
        data: editingClient,
      });
    } else {
      await createMutation.mutateAsync({
        ...editingClient,
        logo: editingClient.logo || '/images/clients/default.svg',
        isVisible: true,
      });
    }
  };

  const handleToggleVisibility = async (client: ClientDTO) => {
    const id = client._id || client.id;
    if (!id) return;
    await updateMutation.mutateAsync({
      id,
      data: { isVisible: !client.isVisible },
    });
  };

  const handleDelete = async (client: ClientDTO) => {
    const id = client._id || client.id;
    if (!id) return;
    if (confirm(`Remove client "${client.name}"?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="flex min-h-screen bg-primary text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <AdminHeader
          title="CLIENT MANAGEMENT"
          description="Manage client brand relationships displayed on the public website."
          actions={
            <button
              onClick={() => {
                setEditingClient({ name: '', websiteUrl: '', displayOrder: clients.length + 1 });
                setModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-white font-display text-xs uppercase font-semibold hover:bg-[#d62839]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Client</span>
            </button>
          }
        />

        <div className="border border-border-custom bg-secondary overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary/80 border-b border-border-custom text-xs font-mono uppercase text-text-secondary">
              <tr>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Website</th>
                <th className="py-3 px-4 text-center">Order</th>
                <th className="py-3 px-4 text-center">Visible</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              {clients.map((c) => (
                <tr key={c._id || c.id} className="hover:bg-primary/40 transition-colors">
                  <td className="py-3 px-4 font-display font-bold text-white">
                    {c.name}
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-neutral-300">
                    {c.websiteUrl || 'None'}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-xs">
                    {c.displayOrder}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleVisibility(c)}
                      className={`p-1.5 ${
                        c.isVisible ? 'text-emerald-400' : 'text-neutral-500'
                      }`}
                      title="Toggle Visibility"
                    >
                      {c.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingClient({ ...c });
                          setModalOpen(true);
                        }}
                        className="p-1.5 bg-primary border border-border-custom text-neutral-300 hover:text-white hover:border-accent"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c)}
                        className="p-1.5 bg-primary border border-border-custom text-neutral-400 hover:text-red-400 hover:border-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && editingClient && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-secondary border border-border-custom max-w-md w-full p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-border-custom mb-6">
                <h3 className="font-display font-bold uppercase text-lg text-white">
                  {editingClient._id ? 'Edit Client' : 'Add Client'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={editingClient.name || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                    required
                    placeholder="e.g. Dialog Play"
                    className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                    Website URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={editingClient.websiteUrl || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, websiteUrl: e.target.value })}
                    placeholder="https://www.dialog.lk"
                    className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border-custom">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2 border border-border-custom text-xs font-display font-semibold uppercase text-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-accent hover:bg-[#d62839] text-white text-xs font-display font-semibold uppercase flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
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

