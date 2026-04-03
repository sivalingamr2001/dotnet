import { lazy } from 'react';
import { LazyPage } from './LazyPage';

const LoginPage = lazy(async () => import('@/features/auth').then((m) => ({ default: m.LoginPage })));
const RequesterDashboard = lazy(async () => import('@/features/requester').then((m) => ({ default: m.RequesterDashboard })));
const HODDashboard = lazy(async () => import('@/features/hod').then((m) => ({ default: m.HODDashboard })));
const ITDashboard = lazy(async () => import('@/features/it').then((m) => ({ default: m.ITDashboard })));
const RoleRouter = lazy(async () => import('./RoleRouter').then((m) => ({ default: m.RoleRouter })));

export const LoginRouteView = () => <LazyPage component={LoginPage} />;
export const RequesterRouteView = () => <LazyPage component={RequesterDashboard} />;
export const HODRouteView = () => <LazyPage component={HODDashboard} />;
export const ITRouteView = () => <LazyPage component={ITDashboard} />;
export const RoleRouteView = () => <LazyPage component={RoleRouter} />;
