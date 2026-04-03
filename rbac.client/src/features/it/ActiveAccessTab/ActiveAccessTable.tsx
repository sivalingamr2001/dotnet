import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { StatusTag } from '@/shared/components';
import type { ActiveAccessItem } from '../it.types';
import { RevokeButton } from './RevokeButton';
import styles from '@/features/requester/requesterTable.module.css';

const columns = (onRevoke: (id: number) => void): ColumnsType<ActiveAccessItem> => [
  { title: 'Employee', dataIndex: 'employeeName', key: 'employeeName' },
  { title: 'Folder', dataIndex: 'folderName', key: 'folderName' },
  { title: 'Expires', dataIndex: 'expiresAt', key: 'expiresAt' },
  { title: 'Status', key: 'status', render: (_, row) => <StatusTag status={row.status} /> },
  { title: 'Action', key: 'action', render: (_, row) => <RevokeButton onConfirm={() => onRevoke(row.id)} /> },
];

const rowClassName = (record: ActiveAccessItem) => {
  if (!record.expiresAt) return '';
  const days = Math.ceil((new Date(record.expiresAt).getTime() - Date.now()) / 86400000);
  if (days <= 7) return styles.expiringCritical;
  if (days <= 30) return styles.expiringSoon;
  return '';
};

export function ActiveAccessTable({ data, onRevoke }: { data: ActiveAccessItem[]; onRevoke: (id: number) => void }) {
  return <Table rowKey="id" dataSource={data} columns={columns(onRevoke)} rowClassName={rowClassName} />;
}
