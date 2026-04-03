import { Layout } from 'antd';
import { LoginForm } from './LoginForm';
import { useLogin } from './useLogin';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const mutation = useLogin();
  return (
    <Layout className={styles.page}>
      <LoginForm onSubmit={(values) => mutation.mutate(values)} isPending={mutation.isPending} />
    </Layout>
  );
}
