import { Card } from 'antd';
import { QueueTable } from './QueueTable';
import { useITApprove } from '../useITApprove';
import { useITQueue } from '../useITQueue';
import { useITReject } from '../useITReject';

export function ITApprovalQueueTab() {
  const { data = [], isLoading } = useITQueue();
  const approve = useITApprove();
  const reject = useITReject();
  return (
    <Card>
      <QueueTable
        data={data}
        isLoading={isLoading}
        onApprove={(id) => approve.mutate(id)}
        onReject={(requestId, reason) => reject.mutate({ requestId, reason })}
        isPending={approve.isPending || reject.isPending}
      />
    </Card>
  );
}
