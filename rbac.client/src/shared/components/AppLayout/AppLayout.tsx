import { Layout } from 'antd';
import { Outlet } from '@tanstack/react-router';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import styles from './AppLayout.module.css';

export function AppLayout() {
  return (
    <Layout>
      <AppSidebar />
      <Layout>
        <AppHeader />
        <Layout.Content className={styles.content}>
          <div className={styles.pageWrapper}>
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
