import { Heading, Stack, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

import { DemoLoginControls } from '~/features/auth/components/DemoLoginControls';

export function LoginPage(): ReactElement {
  return (
    <Stack gap="4">
      <Heading as="h1" size="xl">
        Login
      </Heading>

      <Text color="fg.muted">Pick a role to simulate authentication and permission checks.</Text>

      <DemoLoginControls />
    </Stack>
  );
}
