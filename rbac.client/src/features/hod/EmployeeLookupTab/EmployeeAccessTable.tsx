import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ApprovalItem } from '../hod.types';
import { StatusTag } from '@/shared/components';

const columns: ColumnsType<ApprovalItem> = [
  { title: 'Folder', dataIndex: 'folderName', key: 'folderName' },
  { title: 'Access', dataIndex: 'accessType', key: 'accessType' },
  { title: 'Status', key: 'status', render: (_, row) => <StatusTag status={row.status} /> },
];

export function EmployeeAccessTable({ data }: { data: ApprovalItem[] }) {
  return <Table rowKey="id" pagination={false} dataSource={data} columns={columns} />;
}
