import { RouterProvider } from '@tanstack/react-router';

import { AppProviders } from '~/app/providers/AppProviders';
import { router } from '~/app/router/router';

import '~/styles/app.css';

export const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
      {/* <TanStackRouterDevtools router={router} /> */}
    </AppProviders>
  );
};
