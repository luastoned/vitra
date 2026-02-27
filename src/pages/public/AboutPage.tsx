import { Heading, Stack, Text } from '@chakra-ui/react';

export function AboutPage() {
  return (
    <Stack gap="3">
      <Heading as="h1" size="xl">
        About
      </Heading>
      <Text color="fg.muted">This project is organized for public, app, and admin areas with role-based guards.</Text>
    </Stack>
  );
}
