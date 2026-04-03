import { useQuery } from '@tanstack/react-query';
import { itClient } from '@/api/apiClient';
import { itKeys } from './it.types';

export const useITQueue = () =>
  useQuery({
    queryKey: itKeys.queue(),
    queryFn: async () => {
      const response = await itClient.getQueue();
      return response.data ?? [];
    },
  });
