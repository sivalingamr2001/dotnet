import { Badge, Button, Dropdown, List, Space, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from '@/shared/hooks/useNotifications';

export function NotificationDropdown() {
  const { data = [] } = useNotifications();
  const menu = (
    <Space direction="vertical" size={0}>
      <List
        dataSource={data.slice(0, 5)}
        renderItem={(item) => <NotificationItem notification={item} />}
      />
      <Button type="link">View all</Button>
    </Space>
  );

  return (
    <Dropdown dropdownRender={() => menu} trigger={['click']}>
      <Badge count={data.filter((item) => item.unread).length} size="small">
        <Typography.Link>
          <BellOutlined />
        </Typography.Link>
      </Badge>
    </Dropdown>
  );
}
