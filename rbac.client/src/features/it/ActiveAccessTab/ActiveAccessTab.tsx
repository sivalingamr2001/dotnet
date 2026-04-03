import { Card } from 'antd';
import { ActiveAccessTable } from './ActiveAccessTable';
import { useActiveAccess } from '../useActiveAccess';
import { useRevokeAccess } from '../useRevokeAccess';

export function ActiveAccessTab() {
  const { data = [] } = useActiveAccess();
  const revoke = useRevokeAccess();
  return <Card><ActiveAccessTable data={data} onRevoke={(id) => revoke.mutate(id)} /></Card>;
}
