import { CSSReset, ChakraProvider, ColorModeScript, type ThemeConfig, theme as baseTheme, extendTheme } from '@chakra-ui/react';
import { theme as proTheme } from '@chakra-ui/pro-theme';
import { RouterProvider } from '@tanstack/react-router';

import { router } from '~/Router';

import '~/styles/app.css';

export const App = () => {
  const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: true,
  };

  const theme = extendTheme(proTheme, {
    config,
    colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
    fonts: {
      heading: "'Quicksand', sans-serif",
      body: "'Roboto Flex', sans-serif",
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />

      <ColorModeScript />

      <RouterProvider router={router} />
      {/* <TanStackRouterDevtools router={router} /> */}
    </ChakraProvider>
  );
};
