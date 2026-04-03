import { Drawer } from 'antd';
import { RequestTimeline } from './RequestTimeline';
import type { AccessRequest } from '../requester.types';

export function RequestDetailDrawer({
  open,
  request,
  onClose,
}: {
  open: boolean;
  request?: AccessRequest;
  onClose: () => void;
}) {
  return (
    <Drawer open={open} onClose={onClose} title={`Request #${request?.id ?? ''}`}>
      <RequestTimeline request={request} />
    </Drawer>
  );
}
