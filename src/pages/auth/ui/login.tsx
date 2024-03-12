import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { LoginFormValues, login } from '@/features/auth/login';
import { queryClient } from '@/shared/lib';
import { PasswordInput } from '@/shared/ui';

export function LoginPage() {
  const toast = useToast();
  const methods = useForm<LoginFormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['current_user'] });
    },
    onError(error) {
      if (error.message === 'Invalid login credentials') {
        toast({
          title: '이메일 또는 비밀번호가 일치하지 않습니다.',
          position: 'top',
          status: 'error',
        });
      }
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    if (isPending) return;
    mutate(values);
  };

  return (
    <Box w="480px" background="white" _dark={{ background: 'black' }} py={2} px={4}>
      <Heading size="xl" textAlign="center">
        로그인
      </Heading>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email} mb={2}>
            <FormLabel>이메일</FormLabel>
            <Input
              type="email"
              {...register('email', {
                required: '이메일은 필수입니다.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={2} isInvalid={!!errors.password}>
            <FormLabel>비밀번호</FormLabel>
            <PasswordInput isValidate={false} />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue" w="full" mt={3}>
            로그인
          </Button>
        </form>
      </FormProvider>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Link to="/auth/register">회원가입</Link>
      </Box>
    </Box>
  );
}
