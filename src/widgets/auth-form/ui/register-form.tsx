import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SignUpFormValues } from '@/entities/auth';
import { UploadedAvatar } from '@/shared/ui/form';

import { PasswordInput, passwordTypeEnum } from './password-input';

export function RegisterForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpFormValues>();
  return (
    <>
      <FormControl mb={2}>
        <FormLabel htmlFor="profileImage" cursor="pointer" textAlign="center">
          <UploadedAvatar name="profileImage" />
        </FormLabel>
        <Input
          type="file"
          id="profileImage"
          accept="image/*"
          display="none"
          {...register('profileImage')}
        />
      </FormControl>
      <FormControl isInvalid={!!errors.email} mb={2}>
        <FormLabel>email</FormLabel>
        <Input type="email" {...register('email')} />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.nickname} mb={2}>
        <FormLabel>nickname</FormLabel>
        <Input {...register('nickname')} />
        <FormErrorMessage>{errors.nickname && errors.nickname.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password} mb={2}>
        <FormLabel>password</FormLabel>
        <PasswordInput />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.confirmPassword} mb={2}>
        <FormLabel>confirm password</FormLabel>
        <PasswordInput
          type={passwordTypeEnum.ConfirmPassword}
          borderWidth="1px"
          borderColor="inherit"
          opacity="1 !important"
        />
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}
