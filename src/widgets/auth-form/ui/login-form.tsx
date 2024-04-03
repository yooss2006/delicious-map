import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { LoginFormValues } from '@/entities/auth';

import { PasswordInput } from './password-input';

export function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormValues>();
  return (
    <>
      <FormControl isInvalid={!!errors.email} mb={3}>
        <FormLabel>email</FormLabel>
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
      <FormControl mb={4} isInvalid={!!errors.password}>
        <FormLabel>password</FormLabel>
        <PasswordInput />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>
    </>
  );
}
