import type { RequestColumns, RequestTableParams } from './requester.types';
import { StatusTag } from '@/shared/components';
import { RequestRow } from './RequestRow';

export const getRequestTableColumns = ({
  onViewDetail,
}: RequestTableParams): RequestColumns => [
  { title: 'Request ID', dataIndex: 'id', key: 'id' },
  { title: 'Folder', dataIndex: 'folderName', key: 'folderName' },
  { title: 'Access', dataIndex: 'accessType', key: 'accessType' },
  { title: 'Created', dataIndex: 'createdOn', key: 'createdOn' },
  { title: 'Status', key: 'status', render: (_, row) => <StatusTag status={row.status} /> },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, row) => <RequestRow requestId={row.id} onViewDetail={onViewDetail} />,
  },
];
