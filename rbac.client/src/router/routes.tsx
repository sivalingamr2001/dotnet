import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { queryClient } from '@/shared/lib/queryClient';
import { AppLayout } from '@/shared/components';
import { Forbidden } from '@/shared/components';
import { HODRouteView, ITRouteView, LoginRouteView, RequesterRouteView, RoleRouteView } from './lazyViews';
import { requireAuth, requirePermission, requireRole } from './routeGuards';

const rootRoute = createRootRoute({ component: () => <Outlet /> });
const loginRoute = createRoute({ getParentRoute: () => rootRoute, path: '/login', component: LoginRouteView });
const forbiddenRoute = createRoute({ getParentRoute: () => rootRoute, path: '/forbidden', component: Forbidden });
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_auth',
  beforeLoad: requireAuth,
  component: AppLayout,
});
const dashboardRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/dashboard',
  component: RoleRouteView,
  loader: async () => queryClient.ensureQueryData({ queryKey: ['notifications'], queryFn: async () => [] }),
});
const requestsRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/requests',
  beforeLoad: requireRole(['Requester']),
  loader: requirePermission('access.request.read'),
  component: RequesterRouteView,
});
const hodRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/hod',
  beforeLoad: requireRole(['HOD']),
  loader: requirePermission('hod.approvals.read'),
  component: HODRouteView,
});
const itRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/it',
  beforeLoad: requireRole(['IT']),
  loader: requirePermission('it.queue.read'),
  component: ITRouteView,
});

const routeTree = rootRoute.addChildren([loginRoute, forbiddenRoute, authRoute.addChildren([dashboardRoute, requestsRoute, hodRoute, itRoute])]);
export const router = createRouter({ routeTree });
declare module '@tanstack/react-router' { interface Register { router: typeof router } }
