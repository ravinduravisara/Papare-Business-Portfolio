import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, FALLBACK_PROJECTS } from '../lib/api.js';
import type { ProjectDTO } from '@thepapare/shared';

export function useProjects(category?: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['projects', category || 'all'],
    queryFn: () => api.getProjects(category),
    initialData: category && category !== 'All' && category !== 'All Projects'
      ? FALLBACK_PROJECTS.filter((p) => p.category === category)
      : FALLBACK_PROJECTS,
    staleTime: 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<ProjectDTO>) => api.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectDTO> }) => api.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });

  return {
    projects: query.data,
    isLoading: query.isLoading,
    error: query.error,
    createProject: createMutation.mutateAsync,
    updateProject: updateMutation.mutateAsync,
    deleteProject: deleteMutation.mutateAsync,
  };
}

export function useProjectDetail(slug: string) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => api.getProjectBySlug(slug),
    initialData: FALLBACK_PROJECTS.find((p) => p.slug === slug) || null,
    enabled: Boolean(slug),
  });
}

