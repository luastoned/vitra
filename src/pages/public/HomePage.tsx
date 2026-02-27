import { Heading, Stack, Text } from '@chakra-ui/react';

export function HomePage() {
  return (
    <Stack gap="3">
      <Heading as="h1" size="2xl">
        Vitra
      </Heading>
      <Text color="fg.muted">A modern React starter with Chakra UI, TanStack Router, React Query, and Zustand.</Text>
    </Stack>
  );
}
