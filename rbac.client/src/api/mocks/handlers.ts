import { http, HttpResponse } from 'msw';

const loginUser = (username: string) => {
  if (username.toLowerCase().includes('hod')) return { empId: 'E1002', empName: 'Harini HOD', role: 'HOD', department: 'Finance' };
  if (username.toLowerCase().includes('it')) return { empId: 'E1003', empName: 'Irfan IT', role: 'IT', department: 'Technology' };
  return { empId: 'E1001', empName: 'Riya Requester', role: 'Requester', department: 'HR' };
};

const myRequests = [
  { id: 101, empId: 'E1001', folderName: 'Finance/Payroll', accessType: 'Read', reason: 'Monthly reporting', status: 'PendingHOD', createdOn: '2026-04-01', expiresAt: '2026-04-08' },
  { id: 102, empId: 'E1001', folderName: 'HR/Policies', accessType: 'Write', reason: 'Policy updates', status: 'Approved', createdOn: '2026-03-28', expiresAt: '2026-05-15' },
  { id: 103, empId: 'E1001', folderName: 'Ops/Vendors', accessType: 'Read', reason: 'Vendor follow-up', status: 'PendingIT', createdOn: '2026-03-29', expiresAt: '2026-04-20' },
  { id: 104, empId: 'E1001', folderName: 'Legal/Contracts', accessType: 'Full', reason: 'Audit review', status: 'RejectedByHOD', createdOn: '2026-03-22' },
];

const pending = [
  { id: 201, employeeName: 'Riya Requester', empId: 'E1001', folderName: 'Finance/Payroll', accessType: 'Read', status: 'PendingHOD' },
  { id: 202, employeeName: 'Vikram Analyst', empId: 'E1010', folderName: 'Sales/Q4', accessType: 'Write', status: 'PendingHOD' },
];

const queue = [
  { id: 301, employeeName: 'Riya Requester', empId: 'E1001', folderName: 'Finance/Payroll', accessType: 'Read', status: 'PendingIT' },
];

const auditLogs = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  action: ['RequestCreated', 'HODApproved', 'ITApproved', 'Revoked'][index % 4],
  actor: ['Riya', 'Harini', 'Irfan'][index % 3],
  createdOn: `2026-04-${String(index + 1).padStart(2, '0')}`,
}));

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { usernameOrEmail: string };
    return HttpResponse.json({ success: true, data: { ...loginUser(body.usernameOrEmail), token: 'mock-jwt-token' } });
  }),
  http.get('/api/access-requests/my', () => HttpResponse.json({ success: true, data: myRequests })),
  http.get('/api/hod/pending', () => HttpResponse.json({ success: true, data: pending })),
  http.get('/api/it/queue', () => HttpResponse.json({ success: true, data: queue })),
  http.get('/api/audit-logs', () => HttpResponse.json({ success: true, data: auditLogs })),
  http.get('/api/dashboard/hod', () => HttpResponse.json({ success: true, data: { pendingCount: 3, approvedMonth: 12, rejectedMonth: 2 } })),
  http.get('/api/dashboard/requester', () => HttpResponse.json({ success: true, data: { totalRequests: 4, approved: 1, pending: 2 } })),
  http.get('/api/dashboard/it', () => HttpResponse.json({ success: true, data: { queue: 1, active: 16, expiringSoon: 4 } })),
  http.get('/api/access-requests/:id', ({ params }) => HttpResponse.json({ success: true, data: myRequests.find((item) => item.id === Number(params.id)) })),
  http.post('/api/access-requests', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ success: true, data: { id: 999, ...body } });
  }),
  http.get('/api/hod/history', () => HttpResponse.json({ success: true, data: [{ ...pending[0], status: 'Approved' }] })),
  http.get('/api/hod/employee-access/:empId', ({ params }) => HttpResponse.json({
    success: true,
    data: { empId: params.empId, empName: 'Riya Requester', department: 'HR', active: 2, pending: 1, expired: 1, accesses: myRequests },
  })),
  http.get('/api/it/active-access', () => HttpResponse.json({ success: true, data: myRequests.filter((item) => item.status === 'Approved') })),
  http.get('/api/it/employee-access/:empId', ({ params }) => HttpResponse.json({
    success: true,
    data: { empId: params.empId, empName: 'Riya Requester', department: 'HR', active: 2, pending: 1, expired: 1, accesses: myRequests },
  })),
  http.post('/api/hod/approve/:requestId', () => HttpResponse.json({ success: true })),
  http.post('/api/hod/reject/:requestId', () => HttpResponse.json({ success: true })),
  http.post('/api/it/approve/:requestId', () => HttpResponse.json({ success: true })),
  http.post('/api/it/reject/:requestId', () => HttpResponse.json({ success: true })),
  http.post('/api/it/revoke/:requestId', () => HttpResponse.json({ success: true })),
];
