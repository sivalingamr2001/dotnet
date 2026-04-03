import { Descriptions, Space } from 'antd';
import { RequestStepper } from '@/shared/components';
import type { AccessRequest } from '../requester.types';

export function RequestTimeline({ request }: { request?: AccessRequest }) {
  if (!request) return null;
  return (
    <Space direction="vertical" size="large">
      <RequestStepper currentStatus={request.status} />
      <Descriptions
        column={1}
        items={[
          { key: 'folder', label: 'Folder', children: request.folderName },
          { key: 'reason', label: 'Reason', children: request.reason },
        ]}
      />
    </Space>
  );
}
