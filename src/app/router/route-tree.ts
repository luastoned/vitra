import { createRootRouteWithContext, createRoute } from '@tanstack/react-router';

import { requireAuth, requireRoles } from '~/app/auth/auth-guards';
import type { RouterContext } from '~/app/router/route-context';
import { AdminLayout } from '~/layouts/AdminLayout';
import { AppLayout } from '~/layouts/AppLayout';
import { PublicLayout } from '~/layouts/PublicLayout';
import { RootLayout } from '~/layouts/RootLayout';
import { AdminHomePage } from '~/pages/admin/AdminHomePage';
import { AuditLogPage } from '~/pages/admin/AuditLogPage';
import { ReportsPage } from '~/pages/admin/ReportsPage';
import { RolesPage } from '~/pages/admin/RolesPage';
import { UsersPage } from '~/pages/admin/UsersPage';
import { DashboardPage } from '~/pages/app/DashboardPage';
import { ProfilePage } from '~/pages/app/ProfilePage';
import { SettingsPage } from '~/pages/app/SettingsPage';
import { AboutPage } from '~/pages/public/AboutPage';
import { HomePage } from '~/pages/public/HomePage';
import { LoginPage } from '~/pages/public/LoginPage';
import { NotFoundPage } from '~/pages/public/NotFoundPage';
import { PricingPage } from '~/pages/public/PricingPage';
import { RegisterPage } from '~/pages/public/RegisterPage';

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
  beforeLoad: ({ context }) => requireRoles(context, ['moderator', 'admin', 'super-admin']),
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
  beforeLoad: ({ context }) => requireRoles(context, ['admin', 'super-admin']),
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
