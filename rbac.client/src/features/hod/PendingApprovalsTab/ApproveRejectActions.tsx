import { Button, Form, Input, Modal, Space } from 'antd';
import { useState } from 'react';

export function ApproveRejectActions({
  requestId,
  onApprove,
  onReject,
  isPending,
}: {
  requestId: number;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
  isPending: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Space>
        <Button type="primary" loading={isPending} onClick={() => onApprove(requestId)}>Approve</Button>
        <Button danger onClick={() => setOpen(true)}>Reject</Button>
      </Space>
      <Modal open={open} footer={null} onCancel={() => setOpen(false)} title="Reject request">
        <Form onFinish={({ reason }) => onReject(requestId, reason)}>
          <Form.Item name="reason" rules={[{ required: true }]}><Input.TextArea rows={3} /></Form.Item>
          <Button htmlType="submit" danger loading={isPending}>Confirm rejection</Button>
        </Form>
      </Modal>
    </>
  );
}
