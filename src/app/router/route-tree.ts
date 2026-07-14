import { createRootRouteWithContext, createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { requireAuth, requireMinimumRole } from '~/app/auth/auth-guards';
import type { RouterContext } from '~/app/router/route-context';

const RootLayout = lazyRouteComponent(() => import('~/layouts/RootLayout'), 'RootLayout');
const PublicLayout = lazyRouteComponent(() => import('~/layouts/PublicLayout'), 'PublicLayout');
const AppLayout = lazyRouteComponent(() => import('~/layouts/AppLayout'), 'AppLayout');
const AdminLayout = lazyRouteComponent(() => import('~/layouts/AdminLayout'), 'AdminLayout');

const HomePage = lazyRouteComponent(() => import('~/pages/public/HomePage'), 'HomePage');
const AboutPage = lazyRouteComponent(() => import('~/pages/public/AboutPage'), 'AboutPage');
const PricingPage = lazyRouteComponent(() => import('~/pages/public/PricingPage'), 'PricingPage');
const LoginPage = lazyRouteComponent(() => import('~/pages/public/LoginPage'), 'LoginPage');
const RegisterPage = lazyRouteComponent(() => import('~/pages/public/RegisterPage'), 'RegisterPage');
const NotFoundPage = lazyRouteComponent(() => import('~/pages/public/NotFoundPage'), 'NotFoundPage');

const DashboardPage = lazyRouteComponent(() => import('~/pages/app/DashboardPage'), 'DashboardPage');
const ProfilePage = lazyRouteComponent(() => import('~/pages/app/ProfilePage'), 'ProfilePage');
const SettingsPage = lazyRouteComponent(() => import('~/pages/app/SettingsPage'), 'SettingsPage');

const AdminHomePage = lazyRouteComponent(() => import('~/pages/admin/AdminHomePage'), 'AdminHomePage');
const UsersPage = lazyRouteComponent(() => import('~/pages/admin/UsersPage'), 'UsersPage');
const ReportsPage = lazyRouteComponent(() => import('~/pages/admin/ReportsPage'), 'ReportsPage');
const RolesPage = lazyRouteComponent(() => import('~/pages/admin/RolesPage'), 'RolesPage');
const AuditLogPage = lazyRouteComponent(() => import('~/pages/admin/AuditLogPage'), 'AuditLogPage');

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public-layout',
  component: PublicLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: 'about',
  component: AboutPage,
});

const pricingRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: 'pricing',
  component: PricingPage,
});

const loginRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: 'login',
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: 'register',
  component: RegisterPage,
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app-layout',
  beforeLoad: ({ context }) => requireAuth(context),
  component: AppLayout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: 'dashboard',
  component: DashboardPage,
});

const profileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: 'profile',
  component: ProfilePage,
});

const settingsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: 'settings',
  component: SettingsPage,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin-layout',
  beforeLoad: ({ context }) => requireMinimumRole(context, 'moderator'),
  component: AdminLayout,
});

const adminHomeRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: 'admin',
  component: AdminHomePage,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: 'admin/users',
  component: UsersPage,
});

const adminReportsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: 'admin/reports',
  component: ReportsPage,
});

const adminRolesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: 'admin/roles',
  beforeLoad: ({ context }) => requireMinimumRole(context, 'admin'),
  component: RolesPage,
});

const adminAuditLogRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: 'admin/audit-log',
  component: AuditLogPage,
});

export const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([homeRoute, aboutRoute, pricingRoute, loginRoute, registerRoute]),
  appLayoutRoute.addChildren([dashboardRoute, profileRoute, settingsRoute]),
  adminLayoutRoute.addChildren([adminHomeRoute, adminUsersRoute, adminReportsRoute, adminRolesRoute, adminAuditLogRoute]),
]);
