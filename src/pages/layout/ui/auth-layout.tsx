import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <Flex
      h="100%"
      justifyContent="center"
      alignItems="center"
      bg="gray.200"
      _dark={{ bg: 'green.900' }}
    >
      <Box
        w="480px"
        px={4}
        py={8}
        borderRadius="20px"
        boxShadow="md"
        background="white"
        _dark={{ background: 'gray.900' }}
      >
        <Outlet />
      </Box>
    </Flex>
  );
}
