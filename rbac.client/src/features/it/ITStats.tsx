import { Card, Col, Row, Statistic } from 'antd';

export function ITStats({ stats }: { stats: { queue: number; active: number; expiringSoon: number } }) {
  const items = [
    { title: 'Queue', value: stats.queue },
    { title: 'Active Access', value: stats.active },
    { title: 'Expiring Soon', value: stats.expiringSoon },
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
