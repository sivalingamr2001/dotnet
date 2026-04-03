import { Suspense, type LazyExoticComponent, type ComponentType } from 'react';
import { Spin } from 'antd';

export function LazyPage({
  component: Component,
}: {
  component: LazyExoticComponent<ComponentType>;
}) {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <Component />
    </Suspense>
  );
}
