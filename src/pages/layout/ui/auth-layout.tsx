import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <Flex h="100%" justifyContent="center" alignItems="center" bg="blue.500">
      <Outlet />
    </Flex>
  );
}
