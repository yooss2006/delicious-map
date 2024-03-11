import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SignUpFormValues, signUp } from '@/features/auth/sign-up';
import { PasswordInput, passwordTypeEnum } from '@/shared/ui';

export function RegisterPage() {
  const navigate = useNavigate();
  const methods = useForm<SignUpFormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess(data) {
      navigate('/auth/email-verification', { replace: true, state: { email: data?.user?.email } });
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async ({ email, password }) => {
    if (isPending) return;
    mutate({
      email,
      password,
    });
  };

  return (
    <Box w="480px" background="black" py={2} px={4}>
      <Heading size="xl" textAlign="center">
        회원가입
      </Heading>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired isInvalid={!!errors.email} mb={2}>
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
          <FormControl isRequired isInvalid={!!errors.password} mb={2}>
            <FormLabel>비밀번호</FormLabel>
            <PasswordInput />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.confirmPassword} mb={2}>
            <FormLabel>비밀번호 확인</FormLabel>
            <PasswordInput type={passwordTypeEnum.ConfirmPassword} />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>
          <Button colorScheme="blue" w="full" mt={3} onClick={handleSubmit(onSubmit)}>
            회원가입
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
}
