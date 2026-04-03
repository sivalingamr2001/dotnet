import { Space, Tabs } from 'antd';
import { PageHeader, PermissionGuard } from '@/shared/components';
import { HODStats } from './HODStats';
import { ApprovalHistoryTab } from './ApprovalHistoryTab';
import { EmployeeLookupTab } from './EmployeeLookupTab';
import { PendingApprovalsTab } from './PendingApprovalsTab';

const mockStats = { pendingCount: 3, approvedMonth: 12, rejectedMonth: 2 };

export function HODDashboard() {
  return (
    <PermissionGuard permission="dashboard.hod.read">
      <Space direction="vertical" size="large">
        <PageHeader title="HOD Dashboard" items={[{ title: 'Home' }, { title: 'HOD' }]} />
        <HODStats stats={mockStats} />
        <Tabs items={[
          { key: 'pending', label: 'Pending Approvals', children: <PendingApprovalsTab /> },
          { key: 'history', label: 'Approval History', children: <ApprovalHistoryTab /> },
          { key: 'lookup', label: 'Employee Lookup', children: <EmployeeLookupTab /> },
        ]} />
      </Space>
    </PermissionGuard>
  );
}
