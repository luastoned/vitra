import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from '@tanstack/react-router';

import { ColorModeProvider } from '~/components/ui/color-mode';

import { router } from '~/globals/Router';
import { system } from '~/globals/Theme';

import '~/styles/app.scss';

export const App = () => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider />

      <RouterProvider router={router} />
      {/* <TanStackRouterDevtools router={router} /> */}
    </ChakraProvider>
  );
};
