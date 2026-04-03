import { Table } from 'antd';
import { getRequestTableColumns } from './requestTableColumns';
import type { AccessRequest } from './requester.types';
import styles from './requesterTable.module.css';

const rowClassName = (record: AccessRequest) => {
  if (!record.expiresAt) return '';
  const days = Math.ceil((new Date(record.expiresAt).getTime() - Date.now()) / 86400000);
  if (days <= 7) return styles.expiringCritical;
  if (days <= 30) return styles.expiringSoon;
  return '';
};

export function MyRequestsTable({
  data,
  isLoading,
  onViewDetail,
}: {
  data: AccessRequest[];
  isLoading: boolean;
  onViewDetail: (id: number) => void;
}) {
  return (
    <Table
      rowKey="id"
      loading={isLoading}
      dataSource={data}
      columns={getRequestTableColumns({ onViewDetail })}
      rowClassName={rowClassName}
    />
  );
}
