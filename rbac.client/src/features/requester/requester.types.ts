import type { ColumnsType } from 'antd/es/table';

export interface AccessRequest {
  id: number;
  empId: string;
  folderName: string;
  accessType: string;
  reason: string;
  status: string;
  createdOn: string;
  expiresAt?: string;
}

export interface RequestDashboardStats {
  totalRequests: number;
  approved: number;
  pending: number;
}

export interface CreateRequestPayload {
  folderName: string;
  accessType: string;
  reason: string;
  durationDays: number;
}

export interface RequestTableParams {
  onViewDetail: (id: number) => void;
}

export type RequestColumns = ColumnsType<AccessRequest>;

export const requestKeys = {
  all: () => ['accessRequests'] as const,
  mine: (empId: string) => ['accessRequests', 'mine', empId] as const,
  detail: (id: number) => ['accessRequests', 'detail', id] as const,
};

export const dashboardKeys = {
  requester: (empId: string) => ['dashboard', 'requester', empId] as const,
  hod: () => ['dashboard', 'hod'] as const,
  it: () => ['dashboard', 'it'] as const,
};
