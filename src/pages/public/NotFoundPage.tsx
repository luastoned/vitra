import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from '@tanstack/react-router';

export function NotFoundPage() {
  return (
    <Stack align="start" gap="4" p={{ base: '6', md: '10' }}>
      <Heading as="h1" size="xl">
        Page not found
      </Heading>
      <Text color="fg.muted">The route you requested does not exist.</Text>
      <Button asChild>
        <RouterLink to="/">Go home</RouterLink>
      </Button>
    </Stack>
  );
}
