import { Heading, Stack, Text } from '@chakra-ui/react';

export function AuditLogPage() {
  return (
    <Stack gap="3">
      <Heading as="h1" size="xl">
        Audit log
      </Heading>
      <Text color="fg.muted">Audit trail and security event viewer placeholder.</Text>
    </Stack>
  );
}
