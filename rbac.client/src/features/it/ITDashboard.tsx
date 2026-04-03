import { Space, Tabs } from 'antd';
import { PageHeader, PermissionGuard } from '@/shared/components';
import { ActiveAccessTab } from './ActiveAccessTab';
import { AuditLogTab } from './AuditLogTab';
import { ITEmployeeLookupTab } from './EmployeeLookupTab';
import { ITApprovalQueueTab } from './ITApprovalQueueTab';
import { ITStats } from './ITStats';

const mockStats = { queue: 1, active: 16, expiringSoon: 4 };

export function ITDashboard() {
  return (
    <PermissionGuard permission="dashboard.it.read">
      <Space direction="vertical" size="large">
        <PageHeader title="IT Dashboard" items={[{ title: 'Home' }, { title: 'IT' }]} />
        <ITStats stats={mockStats} />
        <Tabs items={[
          { key: 'queue', label: 'Approval Queue', children: <ITApprovalQueueTab /> },
          { key: 'active', label: 'Active Access', children: <ActiveAccessTab /> },
          { key: 'lookup', label: 'Employee Lookup', children: <ITEmployeeLookupTab /> },
          { key: 'audit', label: 'Audit Log', children: <AuditLogTab /> },
        ]} />
      </Space>
    </PermissionGuard>
  );
}
