import { Button, Space } from 'antd';

export function RequestRow({
  requestId,
  onViewDetail,
}: {
  requestId: number;
  onViewDetail: (id: number) => void;
}) {
  return (
    <Space>
      <Button onClick={() => onViewDetail(requestId)}>View</Button>
    </Space>
  );
}
