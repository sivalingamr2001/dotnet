import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { accessRequestClient } from '@/api/apiClient';
import { useAuth } from '@/context/AuthContext';
import { dashboardKeys, requestKeys, type CreateRequestPayload } from './requester.types';
import type { CreateAccessRequestCommand } from '@/api/generated/rbac.api';

export const useCreateRequest = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (payload: CreateRequestPayload) => {
      const command: CreateAccessRequestCommand = {
        folderNamePath: payload.folderName,
        typeOfAccess: payload.accessType,
        reasonForAccess: payload.reason,
        isAgreed: true,
      };
      return accessRequestClient.createAccessRequest(command);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: requestKeys.mine(user?.empId ?? '') });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.requester(user?.empId ?? '') });
      message.success('Request created successfully');
    },
  });
};
