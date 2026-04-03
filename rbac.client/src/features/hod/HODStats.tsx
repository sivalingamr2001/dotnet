import { Card, Col, Row, Statistic } from 'antd';

export function HODStats({ stats }: { stats: { pendingCount: number; approvedMonth: number; rejectedMonth: number } }) {
  const items = [
    { title: 'Pending', value: stats.pendingCount },
    { title: 'Approved This Month', value: stats.approvedMonth },
    { title: 'Rejected This Month', value: stats.rejectedMonth },
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
