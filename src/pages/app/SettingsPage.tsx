import { Heading, Stack, Text } from '@chakra-ui/react';

export function SettingsPage() {
  return (
    <Stack gap="3">
      <Heading as="h1" size="xl">
        Settings
      </Heading>
      <Text color="fg.muted">Application settings placeholder.</Text>
    </Stack>
  );
}
