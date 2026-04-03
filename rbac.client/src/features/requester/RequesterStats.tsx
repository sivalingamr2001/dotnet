import { Card, Col, Row, Statistic } from 'antd';
import type { RequestDashboardStats } from './requester.types';

export function RequesterStats({ stats }: { stats: RequestDashboardStats }) {
  const items = [
    { title: 'Total Requests', value: stats.totalRequests },
    { title: 'Approved', value: stats.approved },
    { title: 'Pending', value: stats.pending },
  ];
  return (
    <Row gutter={16}>
      {items.map((item) => (
        <Col span={8} key={item.title}>
          <Card><Statistic title={item.title} value={item.value} valueStyle={{ color: '#2563EB' }} /></Card>
        </Col>
      ))}
    </Row>
  );
}
