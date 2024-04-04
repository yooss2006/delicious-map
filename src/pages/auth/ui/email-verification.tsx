import { Box, Heading, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

import { SubmitButton } from '@/shared/ui/form';

export function EmailVerificationPage() {
  const location = useLocation();
  const { email } = location.state as { email: string };
  return (
    <Box>
      <Heading as="h2" size="xl" textAlign="center" color="green.50">
        이메일 인증
      </Heading>
      <Box mt={2} mb={4} color="green.800" textAlign="center">
        <Text lineHeight={2}>{email} 이메일로 확인 메일을 전송했습니다.</Text>
        <Text lineHeight={2}>확인 후 로그인을 진행해주세요.</Text>
      </Box>

      <Link to="/auth/login">
        <SubmitButton>로그인 페이지로 이동</SubmitButton>
      </Link>
    </Box>
  );
}
