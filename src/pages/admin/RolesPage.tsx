import { Heading, Stack, Text } from '@chakra-ui/react';

export function RolesPage() {
  return (
    <Stack gap="3">
      <Heading as="h1" size="xl">
        Roles & permissions
      </Heading>
      <Text color="fg.muted">Restricted admin settings placeholder (admin/super-admin only).</Text>
    </Stack>
  );
}
