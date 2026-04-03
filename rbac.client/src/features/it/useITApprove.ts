import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { itClient } from '@/api/apiClient';
import { dashboardKeys } from '../requester/requester.types';
import { itKeys } from './it.types';

export const useITApprove = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: number) => itClient.approve(requestId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: itKeys.queue() });
      void queryClient.invalidateQueries({ queryKey: itKeys.activeAccess() });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.it() });
      message.success('Access granted successfully');
    },
  });
};
