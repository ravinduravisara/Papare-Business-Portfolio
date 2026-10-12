import React, { useState } from 'react';
import type { MetaFunction } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api.js';
import { AdminSidebar } from '../../components/admin/AdminSidebar.js';
import { AdminHeader } from '../../components/admin/AdminHeader.js';
import { ProjectEditor } from '../../components/admin/ProjectEditor.js';
import type { ProjectDTO } from '@thepapare/shared';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { buildMetaTags } from '../../lib/seo.js';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Project Management | Admin',
    noindex: true,
  });
};

export default function AdminProjectsPage() {
  const queryClient = useQueryClient();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectDTO | null>(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin', 'projects'],
    queryFn: () => api.getAdminProjects(),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<ProjectDTO>) => api.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectDTO> }) => api.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });

  const handleSave = async (data: Partial<ProjectDTO>) => {
    if (editingProject && (editingProject._id || editingProject.id)) {
      await updateMutation.mutateAsync({
        id: editingProject._id || editingProject.id!,
        data,
      });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleTogglePublish = async (project: ProjectDTO) => {
    const id = project._id || project.id;
    if (!id) return;
    await updateMutation.mutateAsync({
      id,
      data: { isPublished: !project.isPublished },
    });
  };

  const handleToggleFeatured = async (project: ProjectDTO) => {
    const id = project._id || project.id;
    if (!id) return;
    await updateMutation.mutateAsync({
      id,
      data: { featured: !project.featured },
    });
  };

  const handleDelete = async (project: ProjectDTO) => {
    const id = project._id || project.id;
    if (!id) return;
    if (confirm(`Delete project "${project.title}"?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="flex min-h-screen bg-primary text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <AdminHeader
          title="PROJECT MANAGEMENT"
          description="Create, edit, feature and publish agency portfolio projects."
          actions={
            <button
              onClick={() => {
                setEditingProject(null);
                setEditorOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-white font-display text-xs uppercase font-semibold hover:bg-[#d62839]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          }
        />

        {/* Projects Table */}
        <div className="border border-border-custom bg-secondary overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary/80 border-b border-border-custom text-xs font-mono uppercase text-text-secondary">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-text-secondary text-sm">
                    No projects found. Click "Add Project" to create one.
                  </td>
                </tr>
              ) : (
                projects.map((proj) => (
                  <tr key={proj._id || proj.id} className="hover:bg-primary/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={proj.coverImage}
                          alt={proj.title}
                          className="w-12 h-9 object-cover bg-primary border border-border-custom shrink-0"
                        />
                        <div>
                          <span className="font-display font-bold text-white text-sm block">
                            {proj.title}
                          </span>
                          <span className="text-[11px] text-text-secondary font-mono block">
                            /{proj.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-neutral-300">
                      {proj.category}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-primary border border-border-custom text-[11px] font-mono text-neutral-200">
                        {proj.projectStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(proj)}
                        className={`p-1.5 transition-colors ${
                          proj.featured ? 'text-accent' : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                        title="Toggle Homepage Feature"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(proj)}
                        className={`p-1.5 transition-colors ${
                          proj.isPublished
                            ? 'text-emerald-400 hover:text-emerald-300'
                            : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                        title={proj.isPublished ? 'Published (Click to Unpublish)' : 'Draft (Click to Publish)'}
                      >
                        {proj.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setEditorOpen(true);
                          }}
                          className="p-1.5 bg-primary border border-border-custom text-neutral-300 hover:text-white hover:border-accent"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj)}
                          className="p-1.5 bg-primary border border-border-custom text-neutral-400 hover:text-red-400 hover:border-red-500"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {editorOpen && (
          <ProjectEditor
            project={editingProject}
            onSave={handleSave}
            onClose={() => setEditorOpen(false)}
          />
        )}
      </main>
    </div>
  );
}

