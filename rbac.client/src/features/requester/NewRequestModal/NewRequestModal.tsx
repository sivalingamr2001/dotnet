import { Modal } from 'antd';
import { NewRequestForm } from './NewRequestForm';
import type { CreateRequestPayload } from '../requester.types';

export function NewRequestModal({
  open,
  onClose,
  onSubmit,
  isPending,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateRequestPayload) => void;
  isPending: boolean;
}) {
  return (
    <Modal open={open} footer={null} onCancel={onClose} title="New access request" destroyOnClose>
      <NewRequestForm onSubmit={onSubmit} isPending={isPending} />
    </Modal>
  );
}
