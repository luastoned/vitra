import { redirect } from '@tanstack/react-router';

import { hasAnyRole } from '~/app/auth/permissions';
import type { Role } from '~/app/auth/auth-session';
import type { RouterContext } from '~/app/router/route-context';

export function requireAuth(context: RouterContext): void {
  if (!context.user) {
    throw redirect({ to: '/login' });
  }
}

export function requireRoles(context: RouterContext, allowedRoles: Role[]): void {
  requireAuth(context);

  if (!context.user || !hasAnyRole(context.user.role, allowedRoles)) {
    throw redirect({ to: '/dashboard' });
  }
}
