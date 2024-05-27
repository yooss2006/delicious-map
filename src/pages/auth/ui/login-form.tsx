import { Box, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { sessionQueries, sessionSchemas, sessionTypes } from '@/entities/session';
import { SubmitButton, FormItem } from '@/shared/ui/form';

import { PasswordInput } from './password-input';

const useLogin = () => {
  const { mutate: login, isPending } = sessionQueries.useLoginMutation();

  const onSubmit: SubmitHandler<sessionTypes.LoginUserDto> = (values) => {
    if (isPending) return;
    login(values);
  };

  return { onSubmit, isPending };
};

export function LoginForm() {
  const { onSubmit, isPending } = useLogin();
  const methods = useForm<sessionTypes.LoginUserDto>({
    resolver: zodResolver(sessionSchemas.LoginUserDtoSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mx={{ base: 4, md: 0 }}>
          <FormItem labelContent="이메일" error={errors.email} mb={3}>
            <Input type="email" {...register('email')} />
          </FormItem>
          <FormItem labelContent="비밀번호" error={errors.password} mb={4}>
            <PasswordInput />
          </FormItem>
          <SubmitButton isLoading={isPending}>로그인</SubmitButton>
        </Box>
      </form>
    </FormProvider>
  );
}
