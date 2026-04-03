import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { itClient } from '@/api/apiClient';
import { dashboardKeys } from '../requester/requester.types';
import { itKeys } from './it.types';

export const useITReject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, reason }: { requestId: number; reason: string }) =>
      itClient.reject(requestId, reason),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: itKeys.queue() });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.it() });
      message.success('Request rejected successfully');
    },
  });
};
