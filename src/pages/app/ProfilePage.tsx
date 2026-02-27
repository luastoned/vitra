import { Heading, Stack, Text } from '@chakra-ui/react';

export function ProfilePage() {
  return (
    <Stack gap="3">
      <Heading as="h1" size="xl">
        Profile
      </Heading>
      <Text color="fg.muted">User profile and account preferences placeholder.</Text>
    </Stack>
  );
}
