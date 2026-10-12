import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, FALLBACK_SERVICES } from '../lib/api.js';
import type { ServiceDTO } from '@thepapare/shared';

export function useServices() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['services'],
    queryFn: () => api.getServices(),
    initialData: FALLBACK_SERVICES,
    staleTime: 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<ServiceDTO>) => api.createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ServiceDTO> }) => api.updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
  });

  return {
    services: query.data,
    isLoading: query.isLoading,
    error: query.error,
    createService: createMutation.mutateAsync,
    updateService: updateMutation.mutateAsync,
    deleteService: deleteMutation.mutateAsync,
  };
}

export function useServiceDetail(slug: string) {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: () => api.getServiceBySlug(slug),
    initialData: FALLBACK_SERVICES.find((s) => s.slug === slug) || null,
    enabled: Boolean(slug),
  });
}

