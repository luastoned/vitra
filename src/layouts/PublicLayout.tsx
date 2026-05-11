import { Box, Container, HStack, Link, Text } from '@chakra-ui/react';
import { Outlet, Link as RouterLink } from '@tanstack/react-router';

export function PublicLayout() {
  return (
    <Box>
      <Box as="header" borderBottomWidth="1px" bg="bg">
        <Container maxW="6xl" py="3">
          <HStack justify="space-between" gap="4" wrap="wrap">
            <Text fontWeight="bold">Vitra</Text>
            <HStack gap="4">
              <Link asChild>
                <RouterLink to="/">Home</RouterLink>
              </Link>
              <Link asChild>
                <RouterLink to="/about">About</RouterLink>
              </Link>
              <Link asChild>
                <RouterLink to="/pricing">Pricing</RouterLink>
              </Link>
              <Link asChild>
                <RouterLink to="/login">Login</RouterLink>
              </Link>
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Container maxW="6xl" py={{ base: '6', md: '10' }}>
        <Outlet />
      </Container>
    </Box>
  );
}
