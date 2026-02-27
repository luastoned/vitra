import { Heading, Stack, Text } from '@chakra-ui/react';

export function AdminHomePage() {
  return (
    <Stack gap="3">
      <Heading as="h1" size="xl">
        Admin Overview
      </Heading>
      <Text color="fg.muted">Moderation/admin summary placeholder.</Text>
    </Stack>
  );
}
