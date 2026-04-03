import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { itClient } from '@/api/apiClient';
import type { ActiveAccessItem } from './it.types';
import { itKeys } from './it.types';

export const useRevokeAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: number) => itClient.revoke(requestId),
    onMutate: async (requestId) => {
      await queryClient.cancelQueries({ queryKey: itKeys.activeAccess() });
      const previous = queryClient.getQueryData<ActiveAccessItem[]>(itKeys.activeAccess());
      queryClient.setQueryData<ActiveAccessItem[]>(itKeys.activeAccess(), (current = []) =>
        current.filter((item) => item.id !== requestId),
      );
      return { previous };
    },
    onError: (_error, _requestId, context) => {
      queryClient.setQueryData(itKeys.activeAccess(), context?.previous);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: itKeys.activeAccess() });
      message.success('Access revoked');
    },
  });
};
