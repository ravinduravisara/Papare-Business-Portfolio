import React, { useState } from 'react';
import type { ProjectDTO } from '@thepapare/shared';
import { ImageUploader } from './ImageUploader.js';
import { X, Save, AlertCircle } from 'lucide-react';

export interface ProjectEditorProps {
  project?: ProjectDTO | null;
  onSave: (data: Partial<ProjectDTO>) => Promise<void>;
  onClose: () => void;
}

export const ProjectEditor: React.FC<ProjectEditorProps> = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<ProjectDTO>>({
    title: project?.title || '',
    slug: project?.slug || '',
    category: project?.category || 'Corporate Events',
    description: project?.description || '',
    scopeOfWork: project?.scopeOfWork || '',
    projectStatus: project?.projectStatus || 'Completed',
    coverImage: project?.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    gallery: project?.gallery || [],
    featured: project?.featured ?? true,
    isPublished: project?.isPublished ?? true,
    clientName: project?.clientName || '',
    seoTitle: project?.seoTitle || '',
    seoDescription: project?.seoDescription || '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.coverImage) {
      setError('Title, slug, and cover image are required.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await onSave(formData);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData((prev) => ({
      ...prev,
      title,
      slug: project ? prev.slug : generatedSlug,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-secondary border border-border-custom w-full max-w-3xl my-8 rounded-none overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-border-custom flex items-center justify-between bg-primary/60">
          <div>
            <h2 className="font-display font-bold uppercase text-lg text-white">
              {project ? 'Edit Project' : 'Create New Project'}
            </h2>
            <span className="font-mono text-xs text-text-secondary">
              Configure project scope, images, and public display
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                placeholder="e.g. Jetour Owners Club Drive Fest 2026"
              />
            </div>

            <div>
              <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-accent"
                placeholder="e.g. jetour-owners-club-drive-fest-2026"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
              >
                <option value="Corporate Events">Corporate Events</option>
                <option value="Brand Activations">Brand Activations</option>
                <option value="Automotive Experiences">Automotive Experiences</option>
                <option value="Themed Events">Themed Events</option>
                <option value="Fan Engagement">Fan Engagement</option>
                <option value="Creative Production">Creative Production</option>
                <option value="Video Production">Video Production</option>
              </select>
            </div>

            <div>
              <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                Project Status *
              </label>
              <select
                value={formData.projectStatus}
                onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value as any })}
                className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
              >
                <option value="Completed">Completed</option>
                <option value="Active Event">Active Event</option>
                <option value="In Progress">In Progress</option>
                <option value="Proposed Concept">Proposed Concept</option>
                <option value="Concept Development">Concept Development</option>
              </select>
            </div>

            <div>
              <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                Client Name
              </label>
              <input
                type="text"
                value={formData.clientName || ''}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                placeholder="e.g. United Motors"
              />
            </div>
          </div>

          <div>
            <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
              Description *
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="w-full bg-primary border border-border-custom px-4 py-2 text-sm text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
              Scope of Work *
            </label>
            <input
              type="text"
              value={formData.scopeOfWork}
              onChange={(e) => setFormData({ ...formData, scopeOfWork: e.target.value })}
              required
              className="w-full bg-primary border border-border-custom px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
              placeholder="e.g. Event production and coordination."
            />
          </div>

          {/* Cover Image Upload / URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <div>
              <label className="font-display uppercase text-xs font-semibold text-neutral-300 block mb-2">
                Cover Image URL *
              </label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                required
                className="w-full bg-primary border border-border-custom px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <ImageUploader
                label="Or Upload Cover Photo"
                onUploadSuccess={(url) => setFormData({ ...formData, coverImage: url })}
              />
            </div>
          </div>

          {/* Publishing Controls */}
          <div className="pt-4 border-t border-border-custom flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-display font-semibold uppercase text-neutral-200">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-accent rounded accent-accent"
              />
              <span>Feature on Homepage</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-display font-semibold uppercase text-neutral-200">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 text-accent rounded accent-accent"
              />
              <span>Published (Publicly Visible)</span>
            </label>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-6 border-t border-border-custom flex justify-end gap-3 bg-primary/60">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-transparent border border-border-custom text-xs font-display font-semibold uppercase text-neutral-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2.5 bg-accent hover:bg-[#d62839] text-white text-xs font-display font-semibold uppercase flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Project'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

