import { useQuery } from '@tanstack/react-query';
import { accessRequestClient, dashboardClient } from '@/api/apiClient';
import { useAuth } from '@/context/AuthContext';
import { dashboardKeys, requestKeys } from './requester.types';

export const useMyRequests = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: requestKeys.mine(user?.empId ?? 'anonymous'),
    queryFn: async () => {
      const response = await accessRequestClient.getMyRequests();
      return response.data ?? [];
    },
  });
};

export const useRequesterStats = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: dashboardKeys.requester(user?.empId ?? 'anonymous'),
    queryFn: async () => {
      const response = await dashboardClient.getRequester();
      return response.data ?? { totalRequests: 0, approved: 0, pending: 0 };
    },
  });
};
