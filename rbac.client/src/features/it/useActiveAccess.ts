import { useQuery } from '@tanstack/react-query';
import { itClient } from '@/api/apiClient';
import { itKeys } from './it.types';

export const useActiveAccess = () =>
  useQuery({
    queryKey: itKeys.activeAccess(),
    queryFn: async () => {
      const response = await itClient.getActiveAccess();
      return response.data ?? [];
    },
  });
