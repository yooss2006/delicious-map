import { Box, Divider, Text, AbsoluteCenter } from '@chakra-ui/react';

import { useParsedLocation } from '@/shared/hooks';
import { pathKeys } from '@/shared/lib/react-router';
import { Link } from '@/shared/ui/link';

import { HeadingText } from '../ui/heading-text';
import { LoginForm } from '../ui/login-form';
import { OAuthLoginButtonGroup } from '../ui/oauth-login-button-group';

export function LoginPage() {
  const { query } = useParsedLocation();

  return (
    <Box py={{ base: 16, md: 8 }}>
      <HeadingText>로그인</HeadingText>
      <Text mt={2} color="green.800" textAlign="center" _dark={{ color: 'gray.300' }}>
        안녕하세요. 맛있을 지도입니다.
      </Text>
      <Text
        mt={1}
        textAlign="center"
        fontWeight="700"
        color="blue.400"
        _dark={{ color: 'blue.600' }}
      >
        <Link to={pathKeys.auth.register(query.nextUrl)}>
          회원 가입을 원하신다면 여기를 클릭해주세요.
        </Link>
      </Text>
      <Divider mt={5} mb={4} orientation="horizontal" />
      <LoginForm />
      <Box position="relative" p={6}>
        <Divider />
        <AbsoluteCenter px="4" bg="white" _dark={{ bg: 'gray.900' }}>
          또는
        </AbsoluteCenter>
      </Box>
      <OAuthLoginButtonGroup />
    </Box>
  );
}
