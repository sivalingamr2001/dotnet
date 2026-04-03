import { useMemo } from 'react';
import { useRole } from '@/context/RoleContext';
import { getRolePermissions, hasPermission } from '@/shared/lib/permissions';

export const usePermission = (permission: string) => {
  const { activeRole } = useRole();
  return useMemo(() => hasPermission(activeRole, permission), [activeRole, permission]);
};

export const usePermissions = () => {
  const { activeRole } = useRole();
  return useMemo(() => getRolePermissions(activeRole), [activeRole]);
};
