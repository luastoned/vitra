import { createRouter } from '@tanstack/react-router';

import { type AuthUser, getAuthUser } from '~/app/auth/auth-session';
import type { RouterContext } from '~/app/router/route-context';
import { routeTree } from '~/app/router/route-tree';

const routerContext: RouterContext = {
  user: getAuthUser(),
};

export const router = createRouter({
  routeTree,
  context: routerContext,
  defaultPreload: 'intent',
});

export function setRouterUser(user: AuthUser | null): void {
  routerContext.user = user;
  void router.invalidate();
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
