import { Tag } from 'antd';

const colorMap: Record<string, string> = {
  RequestCreated: 'blue',
  HODApproved: 'cyan',
  ITApproved: 'geekblue',
  AccessGranted: 'green',
  Revoked: 'volcano',
  Expired: 'default',
};

export function AuditActionTag({ action }: { action: string }) {
  return <Tag color={colorMap[action] ?? 'default'}>{action}</Tag>;
}
