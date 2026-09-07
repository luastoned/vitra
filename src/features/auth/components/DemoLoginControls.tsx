import { Badge, Button, HStack } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import type { ReactElement } from 'react';

import { AUTH_ROLES, type Role, signIn, signOut } from '~/app/auth/auth-session';

export function DemoLoginControls(): ReactElement {
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
    <>
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
    </>
  );
}
