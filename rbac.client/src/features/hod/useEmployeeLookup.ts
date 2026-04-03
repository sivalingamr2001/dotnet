import { useQuery } from '@tanstack/react-query';
import { hodClient } from '@/api/apiClient';
import { hodKeys } from './hod.types';

export const useEmployeeLookup = (empId: string) =>
  useQuery({
    queryKey: hodKeys.employeeLookup(empId),
    queryFn: async () => {
      const response = await hodClient.getEmployeeAccessByEmpId(empId);
      return response.data;
    },
    enabled: !!empId,
  });
