import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ApprovalItem } from '@/features/hod/hod.types';
import { StatusTag } from '@/shared/components';
import { RevokeButton } from '../ActiveAccessTab/RevokeButton';

const columns = (onRevoke: (id: number) => void): ColumnsType<ApprovalItem> => [
  { title: 'Folder', dataIndex: 'folderName', key: 'folderName' },
  { title: 'Access', dataIndex: 'accessType', key: 'accessType' },
  { title: 'Status', key: 'status', render: (_, row) => <StatusTag status={row.status} /> },
  { title: 'Action', key: 'action', render: (_, row) => <RevokeButton onConfirm={() => onRevoke(row.id)} /> },
];

export function ITEmployeeAccessTable({
  data,
  onRevoke,
}: {
  data: ApprovalItem[];
  onRevoke: (id: number) => void;
}) {
  return <Table rowKey="id" pagination={false} dataSource={data} columns={columns(onRevoke)} />;
}
