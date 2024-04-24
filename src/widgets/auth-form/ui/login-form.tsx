import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { LoginUserDtoSchema, LoginUserDto, useLoginUser } from '@/entities/session';
import { SubmitButton } from '@/shared/ui/form';

import { PasswordInput } from './password-input';

export function LoginForm() {
  const { mutate: login, isPending } = useLoginUser();

  const methods = useForm<LoginUserDto>({
    resolver: zodResolver(LoginUserDtoSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (values: LoginUserDto) => {
    if (isPending) return;
    login(values);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email} mb={3}>
          <FormLabel>이메일</FormLabel>
          <Input type="email" {...register('email')} />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={!!errors.password}>
          <FormLabel>비밀번호</FormLabel>
          <PasswordInput />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
        <SubmitButton isLoading={isPending}>로그인</SubmitButton>
      </form>
    </FormProvider>
  );
}
