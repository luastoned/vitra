import { createRouter } from '@tanstack/react-router';

import { getAuthUser, subscribeAuthUser } from '~/app/auth/auth-session';
import type { RouterContext } from '~/app/router/route-context';
import { routeTree } from '~/app/router/route-tree';

const routerContext: RouterContext = {
  getAuthUser,
};

export const router = createRouter({
  routeTree,
  context: routerContext,
  defaultPreload: 'intent',
});

const unsubscribeAuthUser = subscribeAuthUser(() => {
  void router.invalidate();
});

if (import.meta.hot) {
  import.meta.hot.dispose(unsubscribeAuthUser);
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
