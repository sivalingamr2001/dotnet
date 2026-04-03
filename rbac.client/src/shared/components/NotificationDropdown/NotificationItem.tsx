import { Avatar, List, Typography } from 'antd';
import { BellOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import type { NotificationRecord } from '@/shared/hooks/useNotifications';
import styles from './NotificationDropdown.module.css';

const iconMap = {
  request: <BellOutlined />,
  approval: <CheckCircleOutlined />,
  alert: <WarningOutlined />,
};

export function NotificationItem({ notification }: { notification: NotificationRecord }) {
  return (
    <List.Item className={notification.unread ? styles.unreadItem : undefined}>
      <List.Item.Meta
        avatar={<Avatar icon={iconMap[notification.type]} />}
        title={<Typography.Text strong={notification.unread}>{notification.title}</Typography.Text>}
      />
    </List.Item>
  );
}
