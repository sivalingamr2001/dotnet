import { Card } from 'antd';
import { useState } from 'react';
import { AuditTable } from './AuditTable';
import { AuditFilters } from './AuditFilters';
import { useAuditLog } from '../useAuditLog';

export function AuditLogTab() {
  const [filter, setFilter] = useState('All');
  const { data = [], isLoading } = useAuditLog(filter);
  return <Card extra={<AuditFilters onChange={setFilter} />}><AuditTable data={data} isLoading={isLoading} /></Card>;
}
