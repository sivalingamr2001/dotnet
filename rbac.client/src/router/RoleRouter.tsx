import { Navigate } from '@tanstack/react-router';
import { useRole } from '@/context/RoleContext';
import { HODDashboard } from '@/features/hod';
import { ITDashboard } from '@/features/it';
import { RequesterDashboard } from '@/features/requester';
import { hasPermission } from '@/shared/lib/permissions';

export function RoleRouter() {
  const { activeRole } = useRole();
  if (!activeRole) return <Navigate to="/login" />;
  if (activeRole === 'HOD' && hasPermission(activeRole, 'dashboard.hod.read')) return <HODDashboard />;
  if (activeRole === 'IT' && hasPermission(activeRole, 'dashboard.it.read')) return <ITDashboard />;
  return <RequesterDashboard />;
}
