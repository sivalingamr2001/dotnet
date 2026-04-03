import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { hodClient } from '@/api/apiClient';
import { dashboardKeys } from '../requester/requester.types';
import { hodKeys } from './hod.types';

export const useHODApprove = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: number) => hodClient.approve(requestId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: hodKeys.pending() });
      void queryClient.invalidateQueries({ queryKey: hodKeys.history() });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.hod() });
      message.success('Request approved successfully');
    },
  });
};
