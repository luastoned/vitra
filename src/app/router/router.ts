import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';

import { HomePage } from '~/pages/HomePage';

const rootRoute = createRootRoute({
  component: Outlet,
});

const idxRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const blogRoute = createRoute({ getParentRoute: () => rootRoute, path: 'blog', component: HomePage });
const postRoute = createRoute({ getParentRoute: () => rootRoute, path: '$slug', component: HomePage });

const routeTree = rootRoute.addChildren([idxRoute, blogRoute.addChildren([postRoute])]);

// Create a new router instance
export const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
