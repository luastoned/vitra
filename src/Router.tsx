import { RootRoute, Route, Router } from '@tanstack/react-router';

import { Home } from '~/components/Home';

const rootRoute = new RootRoute({});

const indexRoute = new Route({ getParentRoute: () => rootRoute, path: '/', component: Home });
const blogRoute = new Route({ getParentRoute: () => rootRoute, path: 'blog', component: Home });
const postRoute = new Route({ getParentRoute: () => blogRoute, path: '$slug', component: Home });

const routeTree = rootRoute.addChildren([indexRoute, blogRoute.addChildren([postRoute])]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}
