import React, { useState, useEffect } from 'react';
import type { MetaFunction } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api.js';
import { AdminSidebar } from '../../components/admin/AdminSidebar.js';
import { AdminHeader } from '../../components/admin/AdminHeader.js';
import type { SiteSettingsDTO } from '@thepapare/shared';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { buildMetaTags } from '../../lib/seo.js';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Website Settings | Admin',
    noindex: true,
  });
};

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: initialSettings, isLoading } = useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: () => api.getSettings(),
  });

  const [settings, setSettings] = useState<Partial<SiteSettingsDTO>>({
    companyName: 'ThePapare Events',
    tagline: 'Experience Beyond Events.',
    email: 'contact@thepapare.events',
    phone: '+94 11 234 5678',
    address: 'Colombo, Sri Lanka',
    defaultSeoTitle: 'ThePapare Events | Event Management, Creative & Production Agency Sri Lanka',
    defaultSeoDescription:
      'ThePapare Events delivers corporate events, brand activations, event production, creative solutions, video production and studio services in Sri Lanka.',
    footerContent:
      'ThePapare Events is an integrated events, creative and production agency delivering end-to-end solutions for brands, businesses and organizations.',
  });

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const updateMutation = useMutation({
    mutationFn: (data: Partial<SiteSettingsDTO>) => api.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'settings'] });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (err: any) => {
      setError(err?.message || 'Failed to update settings');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    await updateMutation.mutateAsync(settings);
  };

  return (
    <div className="flex min-h-screen bg-primary text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <AdminHeader
          title="WEBSITE SETTINGS"
          description="Manage global corporate branding, agency contact details, and default SEO metadata."
        />

        <div className="max-w-3xl bg-secondary border border-border-custom p-8">
          {success && (
            <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Settings updated successfully and persisted to database.</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={settings.companyName || ''}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  required
                  className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline || ''}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  required
                  className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                  Inquiry Email
                </label>
                <input
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={settings.phone || ''}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                  Business Location
                </label>
                <input
                  type="text"
                  value={settings.address || ''}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border-custom space-y-4">
              <span className="font-mono text-xs uppercase text-accent font-semibold block">
                // GLOBAL TECHNICAL SEO DEFAULTS
              </span>

              <div>
                <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                  Default Page Title
                </label>
                <input
                  type="text"
                  value={settings.defaultSeoTitle || ''}
                  onChange={(e) => setSettings({ ...settings, defaultSeoTitle: e.target.value })}
                  className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                  Default Meta Description
                </label>
                <textarea
                  rows={2}
                  value={settings.defaultSeoDescription || ''}
                  onChange={(e) => setSettings({ ...settings, defaultSeoDescription: e.target.value })}
                  className="w-full bg-primary border border-border-custom px-4 py-2 text-sm text-white focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border-custom flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-accent hover:bg-[#d62839] text-white text-xs font-display font-semibold uppercase flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

