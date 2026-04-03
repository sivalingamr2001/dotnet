import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/router/routes';
import { AuthProvider } from '@/context/AuthContext';
import { RoleProvider } from '@/context/RoleContext';
import { queryClient } from '@/shared/lib/queryClient';
import { themeConfig } from '@/shared/lib/antdTheme';

async function enableMocks() {
  if (import.meta.env.DEV) {
    const { worker } = await import('@/api/mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}

void enableMocks().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={themeConfig}>
          <AuthProvider>
            <RoleProvider>
              <RouterProvider router={router} />
            </RoleProvider>
          </AuthProvider>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
