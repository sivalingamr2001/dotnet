import type { AxiosResponse } from 'axios';
import { axiosInstance } from './axiosInstance';
import {
  RbacApiClient,
  type CreateAccessRequestCommand,
  type HODApproveCommand,
  type HODRejectCommand,
  type ITApproveCommand,
  type ITRejectCommand,
  type LoginCommand,
  type RevokeAccessCommand,
} from './generated/rbac.api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const generatedClient = new RbacApiClient(BASE_URL, axiosInstance);

const unwrap = <T>(response: AxiosResponse<T>) => response.data;

export const authClient = {
  login: async (body: LoginCommand) => unwrap(await axiosInstance.post('/api/auth/login', body)),
};

export const accessRequestClient = {
  getMyRequests: async () => unwrap(await axiosInstance.get('/api/access-requests/my')),
  getAccessRequestById: async (id: number) => unwrap(await axiosInstance.get(`/api/access-requests/${id}`)),
  createAccessRequest: async (body: CreateAccessRequestCommand) => generatedClient.accessRequestsPOST(body),
};

export const hodClient = {
  getPending: async () => unwrap(await axiosInstance.get('/api/hod/pending')),
  getHistory: async () => unwrap(await axiosInstance.get('/api/hod/history')),
  getEmployeeAccessByEmpId: async (empId: string) => unwrap(await axiosInstance.get(`/api/hod/employee-access/${empId}`)),
  approve: async (requestId: number, comments?: string) => {
    const body: HODApproveCommand = { requestId, comments };
    return generatedClient.approve2(requestId, body);
  },
  reject: async (requestId: number, reason: string) => {
    const body: HODRejectCommand = { requestId, reason };
    return generatedClient.reject2(requestId, body);
  },
};

export const itClient = {
  getQueue: async () => unwrap(await axiosInstance.get('/api/it/queue')),
  getActiveAccess: async () => unwrap(await axiosInstance.get('/api/it/active-access')),
  getEmployeeAccessByEmpId: async (empId: string) => unwrap(await axiosInstance.get(`/api/it/employee-access/${empId}`)),
  approve: async (requestId: number, itsrNumber?: string) => {
    const body: ITApproveCommand = { requestId, itsrNumber };
    return generatedClient.approve(requestId, body);
  },
  reject: async (requestId: number, reason: string) => {
    const body: ITRejectCommand = { requestId, reason };
    return generatedClient.reject(requestId, body);
  },
  revoke: async (requestId: number, reason?: string) => {
    const body: RevokeAccessCommand = { requestId, reason };
    return generatedClient.revoke(requestId, body);
  },
};

export const auditClient = {
  getAuditLogs: async (actionType?: string) =>
    unwrap(await axiosInstance.get('/api/audit-logs', { params: { actionType, page: 1, pageSize: 10 } })),
};

export const dashboardClient = {
  getRequester: async () => unwrap(await axiosInstance.get('/api/dashboard/requester')),
  getHod: async () => unwrap(await axiosInstance.get('/api/dashboard/hod')),
  getIt: async () => unwrap(await axiosInstance.get('/api/dashboard/it')),
};

export { generatedClient };
