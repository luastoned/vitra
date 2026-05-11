import { Badge, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { clearAuthUser, type Role, setAuthUser } from '~/app/auth/auth-session';
import { setRouterUser } from '~/app/router/router';

const availableRoles: Role[] = ['user', 'moderator', 'admin', 'super-admin'];

export function LoginPage() {
  const navigate = useNavigate();

  const loginAs = (role: Role) => {
    const user = {
      id: `demo-${role}`,
      email: `${role}@vitra.local`,
      role,
    };

    setAuthUser(user);
    setRouterUser(user);

    const target = role === 'user' ? '/dashboard' : '/admin';
    void navigate({ to: target });
  };

  const signOut = () => {
    clearAuthUser();
    setRouterUser(null);
    void navigate({ to: '/' });
  };

  return (
    <Stack gap="4">
      <Heading as="h1" size="xl">
        Login
      </Heading>
      <Text color="fg.muted">Pick a role to simulate authentication and permission checks.</Text>
      <HStack gap="2" wrap="wrap">
        {availableRoles.map((role) => (
          <Button key={role} variant="outline" onClick={() => loginAs(role)}>
            Login as {role}
          </Button>
        ))}
      </HStack>
      <HStack gap="2" align="center">
        <Badge colorPalette="purple">Dev helper</Badge>
        <Button size="sm" variant="ghost" onClick={signOut}>
          Clear session
        </Button>
      </HStack>
    </Stack>
  );
}
