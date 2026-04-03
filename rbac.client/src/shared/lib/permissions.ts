const rolePermissions: Record<string, string[]> = {
  Requester: ['dashboard.requester.read', 'access.request.create', 'access.request.read'],
  HOD: ['dashboard.hod.read', 'hod.approvals.read', 'hod.approvals.act', 'employee.lookup.read'],
  IT: ['dashboard.it.read', 'it.queue.read', 'it.queue.act', 'it.audit.read', 'access.revoke'],
};

export const getRolePermissions = (role: string | null) => role ? (rolePermissions[role] ?? []) : [];

export const hasPermission = (role: string | null, permission: string) =>
  getRolePermissions(role).includes(permission);
