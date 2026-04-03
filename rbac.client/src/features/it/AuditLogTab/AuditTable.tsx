import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { AuditLogItem } from '../it.types';
import { AuditActionTag } from './AuditActionTag';

const columns: ColumnsType<AuditLogItem> = [
  { title: 'Action', key: 'action', render: (_, row) => <AuditActionTag action={row.action} /> },
  { title: 'Actor', dataIndex: 'actor', key: 'actor' },
  { title: 'Created On', dataIndex: 'createdOn', key: 'createdOn' },
];

export function AuditTable({ data, isLoading }: { data: AuditLogItem[]; isLoading: boolean }) {
  return <Table rowKey="id" loading={isLoading} dataSource={data} columns={columns} />;
}
