import { Box, Button, Container, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { Outlet, Link as RouterLink, useNavigate, useRouter } from '@tanstack/react-router';

import { clearAuthUser } from '~/app/auth/auth-session';
import { setRouterUser } from '~/app/router/router';

export function AdminLayout() {
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
              Admin Area
            </Text>
            <Text color="fg.muted" fontSize="sm">
              Role: {user?.role ?? 'guest'}
            </Text>
          </Stack>
          <Button variant="outline" size="sm" onClick={onSignOut}>
            Sign out
          </Button>
        </HStack>

        <HStack gap="4" wrap="wrap" borderBottomWidth="1px" pb="3">
          <Link asChild>
            <RouterLink to="/admin">Overview</RouterLink>
          </Link>
          <Link asChild>
            <RouterLink to="/admin/users">Users</RouterLink>
          </Link>
          <Link asChild>
            <RouterLink to="/admin/reports">Reports</RouterLink>
          </Link>
          {(user?.role === 'admin' || user?.role === 'super-admin') && (
            <Link asChild>
              <RouterLink to="/admin/roles">Roles</RouterLink>
            </Link>
          )}
          <Link asChild>
            <RouterLink to="/admin/audit-log">Audit log</RouterLink>
          </Link>
          <Link asChild>
            <RouterLink to="/dashboard">Back to app</RouterLink>
          </Link>
        </HStack>

        <Box>
          <Outlet />
        </Box>
      </Stack>
    </Container>
  );
}
