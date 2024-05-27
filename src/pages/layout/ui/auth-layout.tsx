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
        w="100%"
        maxWidth={{ base: 'auto', md: '480px' }}
        height={{ base: '100%', md: 'auto' }}
        px={4}
        borderRadius={{ base: '0', md: '20px' }}
        boxShadow={{ base: 'none', md: 'md' }}
        background="white"
        _dark={{ background: 'gray.900' }}
      >
        <Outlet />
      </Box>
    </Flex>
  );
}
