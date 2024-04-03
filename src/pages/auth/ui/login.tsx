import {
  Box,
  Button,
  Divider,
  Heading,
  Text,
  Link as ChakraLink,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { LoginFormValues } from '@/entities/auth';
import { useLogin } from '@/features/auth/login/api';
import { LoginForm } from '@/widgets/auth-form';

export function LoginPage() {
  const { mutate, isPending } = useLogin();
  const methods = useForm<LoginFormValues>();
  const { handleSubmit } = methods;

  const onSubmit = (values: LoginFormValues) => {
    if (isPending) return;
    mutate(values);
  };

  return (
    <Box>
      <Heading size="xl" textAlign="center" color="green.50">
        로그인
      </Heading>
      <Text mt={2} color="green.800" textAlign="center">
        안녕하세요. 맛있을 지도 입니다.
      </Text>
      <Text mt={1} textAlign="center" fontWeight="700" color="blue.400">
        <ChakraLink as={Link} to="/auth/register">
          회원 가입을 원하신다면 여기를 클릭하세요.
        </ChakraLink>
      </Text>
      <Divider mt={3} mb={5} orientation="horizontal" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LoginForm />
          <Button
            type="submit"
            size="lg"
            w="full"
            mt={2}
            color="white"
            bg="green.100"
            _hover={{ bg: 'green.300' }}
          >
            로그인
          </Button>
        </form>
      </FormProvider>
      <Divider />
      <Box position="relative" p={6}>
        <Divider colorScheme="green" />
        <AbsoluteCenter bg="white" px="4">
          또는
        </AbsoluteCenter>
      </Box>
    </Box>
  );
}
