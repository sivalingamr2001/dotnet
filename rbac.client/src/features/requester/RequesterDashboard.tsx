import { Button, Card, Space } from 'antd';
import { useState } from 'react';
import { PageHeader, PermissionGuard } from '@/shared/components';
import { MyRequestsTable } from './MyRequestsTable';
import { NewRequestModal } from './NewRequestModal';
import { RequestDetailDrawer } from './RequestDetailDrawer';
import { RequesterStats } from './RequesterStats';
import { useCreateRequest } from './useCreateRequest';
import { useMyRequests, useRequesterStats } from './useMyRequests';
import type { AccessRequest } from './requester.types';

export function RequesterDashboard() {
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data = [], isLoading } = useMyRequests();
  const { data: stats = { totalRequests: 0, approved: 0, pending: 0 } } = useRequesterStats();
  const createMutation = useCreateRequest();
  const selected = data.find((item: AccessRequest) => item.id === selectedId);

  return (
    <PermissionGuard permission="dashboard.requester.read">
      <Space direction="vertical" size="large">
        <PageHeader title="Requester Dashboard" items={[{ title: 'Home' }, { title: 'Requester' }]} />
        <Button type="primary" onClick={() => setCreateOpen(true)}>New Request</Button>
        <RequesterStats stats={stats} />
        <Card><MyRequestsTable data={data} isLoading={isLoading} onViewDetail={setSelectedId} /></Card>
        <NewRequestModal open={createOpen} onClose={() => setCreateOpen(false)} onSubmit={(values) => createMutation.mutate(values)} isPending={createMutation.isPending} />
        <RequestDetailDrawer open={selectedId !== null} request={selected} onClose={() => setSelectedId(null)} />
      </Space>
    </PermissionGuard>
  );
}
