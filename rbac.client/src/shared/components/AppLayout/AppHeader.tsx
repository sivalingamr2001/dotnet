import { Layout, Select, Space, Typography } from 'antd';
import { useAuth } from '@/context/AuthContext';
import { useRole } from '@/context/RoleContext';
import { NotificationDropdown } from '../NotificationDropdown';
import styles from './AppLayout.module.css';

const roles = ['Requester', 'HOD', 'IT'];

export function AppHeader() {
  const { user } = useAuth();
  const { activeRole, setActiveRole } = useRole();

  return (
    <Layout.Header>
      <Space className={styles.headerRow}>
        <Typography.Text>{user?.empName ?? 'RBAC User'}</Typography.Text>
        <Space>
          <Select value={activeRole ?? undefined} options={roles.map((r) => ({ value: r }))} onChange={setActiveRole} />
          <NotificationDropdown />
        </Space>
      </Space>
    </Layout.Header>
  );
}
