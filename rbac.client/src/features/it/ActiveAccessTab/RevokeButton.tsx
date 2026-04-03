import { Button, Popconfirm } from 'antd';

export function RevokeButton({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Popconfirm title="Revoke this access?" onConfirm={onConfirm}>
      <Button danger>Revoke</Button>
    </Popconfirm>
  );
}
