import { Heading, Stack, Text } from '@chakra-ui/react';

export function UsersPage() {
  return (
    <Stack gap="3">
      <Heading as="h1" size="xl">
        Users
      </Heading>
      <Text color="fg.muted">User management table and moderation actions placeholder.</Text>
    </Stack>
  );
}
