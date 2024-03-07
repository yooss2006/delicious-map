import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <Flex h="100%" justifyContent="center" alignItems="center" bg="blue.500">
      <Box w="400px" bg="white" py={2} px={4}>
        <Outlet />
      </Box>
    </Flex>
  );
}
