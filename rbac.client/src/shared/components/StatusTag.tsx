import { Tag } from 'antd';

const colorMap: Record<string, string> = {
  PendingHOD: 'gold',
  PendingIT: 'blue',
  Approved: 'green',
  RejectedByHOD: 'volcano',
  RejectedByIT: 'red',
  Revoked: 'magenta',
  Expired: 'default',
};

export function StatusTag({ status }: { status: string }) {
  return <Tag color={colorMap[status] ?? 'default'}>{status}</Tag>;
}
