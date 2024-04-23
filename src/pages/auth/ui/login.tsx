import { Box, Divider, Heading, Text, Link as ChakraLink, AbsoluteCenter } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { OAuthLoginButtonGroup } from '@/entities/session';
import { useParsedLocation } from '@/shared/hooks';
import { LoginForm } from '@/widgets/auth-form';

export function LoginPage() {
  const { query } = useParsedLocation();
  const nextUrl = query.nextUrl;

  return (
    <Box>
      <Heading size="xl" textAlign="center" color="green.50" _dark={{ color: 'gray.200' }}>
        로그인
      </Heading>
      <Text mt={2} color="green.800" textAlign="center" _dark={{ color: 'gray.300' }}>
        안녕하세요. 맛있을 지도 입니다.
      </Text>
      <Text
        mt={1}
        textAlign="center"
        fontWeight="700"
        color="blue.400"
        _dark={{ color: 'blue.600' }}
      >
        <ChakraLink as={Link} to={`/auth/register${nextUrl ? `?nextUrl=${nextUrl}` : ''}`}>
          회원 가입을 원하신다면 여기를 클릭하세요.
        </ChakraLink>
      </Text>
      <Divider mt={3} mb={5} orientation="horizontal" />
      <LoginForm />
      <Divider />
      <Box position="relative" p={6}>
        <Divider colorScheme="green" />
        <AbsoluteCenter px="4" bg="white" _dark={{ bg: 'gray.900' }}>
          또는
        </AbsoluteCenter>
      </Box>
      <OAuthLoginButtonGroup />
    </Box>
  );
}
