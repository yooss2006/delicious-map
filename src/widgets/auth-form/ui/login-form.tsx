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
        <Input type="email" {...register('email')} />
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
