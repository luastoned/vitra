import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

import { system } from '~/app/theme/theme';
import { queryClient } from '~/shared/lib/query/query-client';
import { ColorModeProvider } from '~/shared/ui/chakra/ColorMode';
import { Toaster } from '~/shared/ui/chakra/Toaster';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <ColorModeProvider>
          {children}
          <Toaster />
        </ColorModeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
