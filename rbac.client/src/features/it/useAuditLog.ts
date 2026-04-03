import { useQuery } from '@tanstack/react-query';
import { auditClient } from '@/api/apiClient';
import { itKeys } from './it.types';

export const useAuditLog = (filter: string) =>
  useQuery({
    queryKey: itKeys.auditLog(filter),
    queryFn: async () => {
      const response = await auditClient.getAuditLogs(filter === 'All' ? undefined : filter);
      return response.data ?? [];
    },
  });
