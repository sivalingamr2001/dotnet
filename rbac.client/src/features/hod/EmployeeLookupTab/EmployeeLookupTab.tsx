import { Card, Empty, Space } from 'antd';
import { useState } from 'react';
import { AccessTableFilters } from './AccessTableFilters';
import { EmployeeAccessTable } from './EmployeeAccessTable';
import { EmployeeCard } from './EmployeeCard';
import { EmployeeSearchBar } from './EmployeeSearchBar';
import { useEmployeeLookup } from '../useEmployeeLookup';
import type { ApprovalItem } from '../hod.types';

export function EmployeeLookupTab() {
  const [empId, setEmpId] = useState('');
  const [filter, setFilter] = useState('All');
  const { data } = useEmployeeLookup(empId);
  const rows = data?.accesses?.filter((item: ApprovalItem) => filter === 'All' || item.accessType === filter) ?? [];
  return (
    <Space direction="vertical" size="large">
      <EmployeeSearchBar onSearch={setEmpId} />
      {data ? (
        <>
          <EmployeeCard employee={data} />
          <Card extra={<AccessTableFilters onChange={setFilter} />}><EmployeeAccessTable data={rows} /></Card>
        </>
      ) : <Empty description="Search for an employee to inspect access" />}
    </Space>
  );
}
