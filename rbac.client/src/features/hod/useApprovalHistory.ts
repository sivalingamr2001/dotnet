import { useQuery } from '@tanstack/react-query';
import { hodClient } from '@/api/apiClient';
import { hodKeys } from './hod.types';

export const useApprovalHistory = () =>
  useQuery({
    queryKey: hodKeys.history(),
    queryFn: async () => {
      const response = await hodClient.getHistory();
      return response.data ?? [];
    },
  });
