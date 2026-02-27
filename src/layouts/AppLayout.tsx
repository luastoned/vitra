import { Box, Button, Container, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink, Outlet, useNavigate, useRouter } from '@tanstack/react-router';

import { clearAuthUser } from '~/app/auth/auth-session';
import { setRouterUser } from '~/app/router/router';

export function AppLayout() {
  const navigate = useNavigate();
  const router = useRouter();
  const user = router.options.context.user;

  const onSignOut = () => {
    clearAuthUser();
    setRouterUser(null);
    void navigate({ to: '/' });
  };

  return (
    <Container maxW="7xl" py={{ base: '4', md: '8' }}>
      <Stack gap="4">
        <HStack justify="space-between" align="center" wrap="wrap">
          <Stack gap="0">
            <Text fontSize="xl" fontWeight="bold">
              App Area
            </Text>
            <Text color="fg.muted" fontSize="sm">
              Signed in as {user?.email ?? 'unknown user'} ({user?.role ?? 'guest'})
            </Text>
          </Stack>
          <Button variant="outline" size="sm" onClick={onSignOut}>
            Sign out
          </Button>
        </HStack>

        <HStack gap="4" wrap="wrap" borderBottomWidth="1px" pb="3">
          <Link asChild>
            <RouterLink to="/dashboard">Dashboard</RouterLink>
          </Link>
          <Link asChild>
            <RouterLink to="/profile">Profile</RouterLink>
          </Link>
          <Link asChild>
            <RouterLink to="/settings">Settings</RouterLink>
          </Link>
          {(user?.role === 'moderator' || user?.role === 'admin' || user?.role === 'super-admin') && (
            <Link asChild>
              <RouterLink to="/admin">Admin</RouterLink>
            </Link>
          )}
        </HStack>

        <Box pb={{ base: '16', md: '0' }}>
          <Outlet />
        </Box>

        <HStack
          display={{ base: 'flex', md: 'none' }}
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          borderTopWidth="1px"
          bg="bg"
          px="4"
          py="3"
          justify="space-around"
        >
          <Link asChild>
            <RouterLink to="/dashboard">Dashboard</RouterLink>
          </Link>
          <Link asChild>
            <RouterLink to="/profile">Profile</RouterLink>
          </Link>
          <Link asChild>
            <RouterLink to="/settings">Settings</RouterLink>
          </Link>
        </HStack>
      </Stack>
    </Container>
  );
}
