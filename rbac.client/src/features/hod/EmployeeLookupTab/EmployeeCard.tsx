import { Avatar, Card, Space, Typography } from 'antd';
import { StatRow } from './StatRow';
import type { EmployeeLookupResult } from '../hod.types';

const initials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2);

export function EmployeeCard({ employee }: { employee: EmployeeLookupResult }) {
  return (
    <Card>
      <Space direction="vertical" size="large">
        <Space>
          <Avatar size={48}>{initials(employee.empName)}</Avatar>
          <Space direction="vertical" size={0}>
            <Typography.Text strong>{employee.empName}</Typography.Text>
            <Typography.Text type="secondary">{employee.department}</Typography.Text>
          </Space>
        </Space>
        <StatRow active={employee.active} pending={employee.pending} expired={employee.expired} />
      </Space>
    </Card>
  );
}
