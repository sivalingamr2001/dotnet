import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ApprovalItem } from '../hod.types';
import { ApproveRejectActions } from './ApproveRejectActions';

const columns = (
  onApprove: (id: number) => void,
  onReject: (id: number, reason: string) => void,
  isPending: boolean,
): ColumnsType<ApprovalItem> => [
  { title: 'Employee', dataIndex: 'employeeName', key: 'employeeName' },
  { title: 'Folder', dataIndex: 'folderName', key: 'folderName' },
  { title: 'Access', dataIndex: 'accessType', key: 'accessType' },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, row) => (
      <ApproveRejectActions
        requestId={row.id}
        onApprove={onApprove}
        onReject={onReject}
        isPending={isPending}
      />
    ),
  },
];

export function PendingTable(props: {
  data: ApprovalItem[];
  isLoading: boolean;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
  isPending: boolean;
}) {
  return <Table rowKey="id" loading={props.isLoading} dataSource={props.data} columns={columns(props.onApprove, props.onReject, props.isPending)} />;
}
