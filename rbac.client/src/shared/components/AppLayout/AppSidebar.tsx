import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useRole } from '@/context/RoleContext';
import { useRoleMenu } from '@/shared/hooks/useRoleMenu';
import styles from './AppLayout.module.css';

export function AppSidebar() {
  const { activeRole } = useRole();
  const items = useRoleMenu(activeRole);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout.Sider className={styles.sider} width={240}>
      <Menu
        mode="inline"
        theme="dark"
        items={items}
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate({ to: key })}
      />
    </Layout.Sider>
  );
}
