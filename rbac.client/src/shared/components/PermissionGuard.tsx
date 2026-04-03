import type { PropsWithChildren } from 'react';
import { Forbidden } from './Forbidden';
import { usePermission } from '@/shared/hooks/usePermission';

export function PermissionGuard({
  permission,
  children,
}: PropsWithChildren<{ permission: string }>) {
  const allowed = usePermission(permission);
  return allowed ? <>{children}</> : <Forbidden />;
}
