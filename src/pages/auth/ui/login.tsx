import { Box, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <Box w="480px" background="black" py={2} px={4}>
      <Heading size="xl" textAlign="center">
        로그인
      </Heading>
      <Link to="/auth/register">회원가입</Link>
    </Box>
  );
}
