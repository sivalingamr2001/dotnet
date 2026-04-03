import { Breadcrumb, Space, Typography } from 'antd';

export function PageHeader({
  title,
  items,
}: {
  title: string;
  items: { title: string }[];
}) {
  return (
    <Space direction="vertical" size={4}>
      <Breadcrumb items={items} />
      <Typography.Title level={3}>{title}</Typography.Title>
    </Space>
  );
}
