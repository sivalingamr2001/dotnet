import { useQuery } from '@tanstack/react-query';
import { hodClient } from '@/api/apiClient';
import { hodKeys } from './hod.types';

export const useHODPending = () =>
  useQuery({
    queryKey: hodKeys.pending(),
    queryFn: async () => {
      const response = await hodClient.getPending();
      return response.data ?? [];
    },
  });
