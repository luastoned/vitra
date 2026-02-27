import { Box } from '@chakra-ui/react';
import { Outlet } from '@tanstack/react-router';

export function RootLayout() {
  return (
    <Box minH="dvh" bg="bg.subtle" color="fg">
      <Outlet />
    </Box>
  );
}
