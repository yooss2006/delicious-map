import { Box, Divider, Heading, Text, Link as ChakraLink, AbsoluteCenter } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { LoginFormValues } from '@/entities/auth';
import { useLogin } from '@/features/auth/login/api';
import { useParsedLocation } from '@/shared/hooks';
import { SubmitButton } from '@/shared/ui/form';
import { LoginForm, SocalLoginButtonGroup } from '@/widgets/auth-form';

const userSchema = z.object({
  email: z.string().min(1, '이메일을 입력하세요.').email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력하세요.'),
});

export function LoginPage() {
  const { mutate: login, isPending } = useLogin();
  const { query } = useParsedLocation();
  const nexturl = query.nexturl;
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(userSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: LoginFormValues) => {
    if (isPending) return;
    login(values);
  };

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
        <ChakraLink as={Link} to={`/auth/register${nexturl ? `?nexturl=${nexturl}` : ''}`}>
          회원 가입을 원하신다면 여기를 클릭하세요.
        </ChakraLink>
      </Text>
      <Divider mt={3} mb={5} orientation="horizontal" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LoginForm />
          <SubmitButton isLoading={isPending}>로그인</SubmitButton>
        </form>
      </FormProvider>
      <Divider />
      <Box position="relative" p={6}>
        <Divider colorScheme="green" />
        <AbsoluteCenter px="4" bg="white" _dark={{ bg: 'gray.900' }}>
          또는
        </AbsoluteCenter>
      </Box>
      <SocalLoginButtonGroup isLoading={isPending} />
    </Box>
  );
}
