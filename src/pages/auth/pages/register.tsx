import { Box, Divider, Text } from '@chakra-ui/react';

import { HeadingText } from '../ui/heading-text';
import { RegisterForm } from '../ui/register-form';

export function RegisterPage() {
  return (
    <Box py={{ base: 4, md: 8 }}>
      <HeadingText>회원가입</HeadingText>
      <Text mt={2} color="green.800" textAlign="center" _dark={{ color: 'gray.300' }}>
        회원가입을 환영합니다.
      </Text>
      <Divider my={4} />
      <RegisterForm />
    </Box>
  );
}
