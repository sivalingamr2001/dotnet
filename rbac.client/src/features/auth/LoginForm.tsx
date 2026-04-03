import { Button, Card, Form, Input } from 'antd';
import type { LoginFormValues } from './auth.types';

export function LoginForm({
  onSubmit,
  isPending,
}: {
  onSubmit: (values: LoginFormValues) => void;
  isPending: boolean;
}) {
  return (
    <Card title="RBAC Portal Login">
      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item label="Username or Email" name="usernameOrEmail" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={isPending}>
          Sign in
        </Button>
      </Form>
    </Card>
  );
}
