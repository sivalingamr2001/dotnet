import { Card, Empty, Space } from 'antd';
import { useState } from 'react';
import { AccessTableFilters } from '@/features/hod/EmployeeLookupTab/AccessTableFilters';
import { EmployeeCard } from '@/features/hod/EmployeeLookupTab/EmployeeCard';
import { EmployeeSearchBar } from '@/features/hod/EmployeeLookupTab/EmployeeSearchBar';
import { ITEmployeeAccessTable } from './ITEmployeeAccessTable';
import { useEmployeeLookup } from '@/features/hod/useEmployeeLookup';
import type { ApprovalItem } from '@/features/hod/hod.types';
import { useRevokeAccess } from '../useRevokeAccess';

export function ITEmployeeLookupTab() {
  const [empId, setEmpId] = useState('');
  const [filter, setFilter] = useState('All');
  const { data } = useEmployeeLookup(empId);
  const revoke = useRevokeAccess();
  const rows = data?.accesses?.filter((item: ApprovalItem) => filter === 'All' || item.accessType === filter) ?? [];
  return (
    <Space direction="vertical" size="large">
      <EmployeeSearchBar onSearch={setEmpId} />
      {data ? (
        <>
          <EmployeeCard employee={data} />
          <Card extra={<AccessTableFilters onChange={setFilter} />}><ITEmployeeAccessTable data={rows} onRevoke={(id) => revoke.mutate(id)} /></Card>
        </>
      ) : <Empty description="Search for an employee to inspect or revoke access" />}
    </Space>
  );
}
