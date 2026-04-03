import { redirect } from '@tanstack/react-router';
import { hasPermission } from '@/shared/lib/permissions';

const tokenKey = 'rbac_token';

export const requireAuth = () => {
  if (!localStorage.getItem(tokenKey)) throw redirect({ to: '/login' });
};

export const requireRole = (allowed: string[]) => () => {
  const raw = localStorage.getItem('rbac_user');
  const role = raw ? JSON.parse(raw).role : null;
  if (!allowed.includes(role)) throw redirect({ to: '/dashboard' });
};

export const requirePermission = (permission: string) => () => {
  const raw = localStorage.getItem('rbac_user');
  const role = raw ? JSON.parse(raw).role : null;
  if (!hasPermission(role, permission)) throw redirect({ to: '/forbidden' });
};
