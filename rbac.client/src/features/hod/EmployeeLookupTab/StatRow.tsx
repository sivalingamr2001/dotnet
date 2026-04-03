import { Col, Row, Statistic } from 'antd';

export function StatRow({ active, pending, expired }: { active: number; pending: number; expired: number }) {
  return (
    <Row gutter={16}>
      <Col span={8}><Statistic title="Active" value={active} valueStyle={{ color: '#2563EB' }} /></Col>
      <Col span={8}><Statistic title="Pending" value={pending} valueStyle={{ color: '#2563EB' }} /></Col>
      <Col span={8}><Statistic title="Expired" value={expired} valueStyle={{ color: '#2563EB' }} /></Col>
    </Row>
  );
}
