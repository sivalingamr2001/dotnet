import { Button, Form, Input, InputNumber, Select } from 'antd';
import type { CreateRequestPayload } from '../requester.types';
import styles from './NewRequestForm.module.css';

const accessOptions = ['Read', 'Write', 'Full'].map((value) => ({ value }));

export function NewRequestForm({
  onSubmit,
  isPending,
}: {
  onSubmit: (values: CreateRequestPayload) => void;
  isPending: boolean;
}) {
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item label="Folder Name" name="folderName" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item label="Access Type" name="accessType" rules={[{ required: true }]}><Select options={accessOptions} /></Form.Item>
      <Form.Item label="Reason" name="reason" rules={[{ required: true }]}><Input.TextArea rows={3} /></Form.Item>
      <Form.Item label="Duration (days)" name="durationDays" initialValue={30}><InputNumber min={1} max={365} className={styles.fullWidth} /></Form.Item>
      <Button htmlType="submit" type="primary" loading={isPending}>Submit request</Button>
    </Form>
  );
}
