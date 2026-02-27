import { Heading, Stack, Text } from '@chakra-ui/react';

export function DashboardPage() {
  return (
    <Stack gap="3">
      <Heading as="h1" size="xl">
        Dashboard
      </Heading>
      <Text color="fg.muted">Authenticated area placeholder. Add KPI cards and live widgets here.</Text>
    </Stack>
  );
}
