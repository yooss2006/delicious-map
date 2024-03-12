import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

export function EmailVerificationPage() {
  const location = useLocation();
  const { email } = location.state as { email: string };
  return (
    <Box w="480px" background="white" _dark={{ background: 'black' }} py={2} px={4}>
      <Heading size="xl" textAlign="center">
        이메일 인증
      </Heading>
      <Text>{`${email} 이메일로 확인 메일을 전송했습니다.`}</Text>
      <Text>확인 후 로그인을 진행해주세요.</Text>
      <Link to="/auth/login">
        <Button w="100%" colorScheme="blue">
          로그인 페이지로 이동
        </Button>
      </Link>
    </Box>
  );
}
