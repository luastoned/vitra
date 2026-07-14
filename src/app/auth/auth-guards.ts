import { redirect } from '@tanstack/react-router';

import type { AuthUser, Role } from '~/app/auth/auth-session';
import { canAccessRole } from '~/app/auth/permissions';
import type { RouterContext } from '~/app/router/route-context';

export function requireAuth(context: RouterContext): AuthUser {
  const user = context.getAuthUser();

  if (!user) {
    throw redirect({ to: '/login' });
  }

  return user;
}

export function requireMinimumRole(context: RouterContext, minimumRole: Role): AuthUser {
  const user = requireAuth(context);

  if (!canAccessRole(user.role, minimumRole)) {
    throw redirect({ to: '/dashboard' });
  }

  return user;
}
