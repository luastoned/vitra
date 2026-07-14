import { Badge, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { AUTH_ROLES, type Role, signIn, signOut } from '~/app/auth/auth-session';

export function LoginPage() {
  const navigate = useNavigate();

  const loginAs = (role: Role) => {
    const user = {
      id: `demo-${role}`,
      email: `${role}@vitra.local`,
      role,
    };

    signIn(user);

    const target = role === 'user' ? '/dashboard' : '/admin';
    void navigate({ to: target });
  };

  const clearSession = () => {
    signOut();
    void navigate({ to: '/' });
  };

  return (
    <Stack gap="4">
      <Heading as="h1" size="xl">
        Login
      </Heading>
      <Text color="fg.muted">Pick a role to simulate authentication and permission checks.</Text>
      <HStack gap="2" wrap="wrap">
        {AUTH_ROLES.map((role) => (
          <Button key={role} variant="outline" onClick={() => loginAs(role)}>
            Login as {role}
          </Button>
        ))}
      </HStack>
      <HStack gap="2" align="center">
        <Badge colorPalette="purple">Dev helper</Badge>
        <Button size="sm" variant="ghost" onClick={clearSession}>
          Clear session
        </Button>
      </HStack>
    </Stack>
  );
}
