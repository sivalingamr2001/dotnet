import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ITQueueItem } from '../it.types';
import { QueueActions } from './QueueActions';

const columns = (
  onApprove: (id: number) => void,
  onReject: (id: number, reason: string) => void,
  isPending: boolean,
): ColumnsType<ITQueueItem> => [
  { title: 'Employee', dataIndex: 'employeeName', key: 'employeeName' },
  { title: 'Folder', dataIndex: 'folderName', key: 'folderName' },
  { title: 'Access', dataIndex: 'accessType', key: 'accessType' },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, row) => (
      <QueueActions
        requestId={row.id}
        onApprove={onApprove}
        onReject={onReject}
        isPending={isPending}
      />
    ),
  },
];

export function QueueTable(props: {
  data: ITQueueItem[];
  isLoading: boolean;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
  isPending: boolean;
}) {
  return <Table rowKey="id" loading={props.isLoading} dataSource={props.data} columns={columns(props.onApprove, props.onReject, props.isPending)} />;
}
