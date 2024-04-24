import { FormControl, FormErrorMessage, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { createProfile as createProfileFn, getProfileByEmail } from '@/entities/profile';
import { SignUpUserDtoSchema, SignUpUserDto, signUpUser } from '@/entities/session';
import { SubmitButton, UploadedAvatar } from '@/shared/ui/form';

import { PasswordInput, passwordTypeEnum } from './password-input';

export function RegisterForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const methods = useForm<SignUpUserDto>({
    resolver: zodResolver(SignUpUserDtoSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const { mutateAsync: signUp, isPending: isSignUpLoading } = useMutation({
    mutationFn: signUpUser,
  });
  const { mutate: createProfile, isPending: isCreateProfileLoading } = useMutation({
    mutationFn: createProfileFn,
    onSuccess: () => {
      toast({ title: '회원가입이 완료되었습니다.', position: 'top', status: 'success' });
      navigate('/auth/login');
    },
  });

  const onSubmit: SubmitHandler<SignUpUserDto> = async (values) => {
    if (isLoading) return;
    const email = await getProfileByEmail(values.email);
    if (email) {
      return toast({
        title: '이미 등록된 이메일입니다.',
        position: 'top',
        status: 'error',
      });
    }
    const signUpResult = await signUp(values);
    if (signUpResult) {
      const { id } = signUpResult;
      const { name, profileImage, email } = values;
      createProfile({ authId: id, name, profileImage, email });
    }
  };

  const isLoading = isSignUpLoading || isCreateProfileLoading;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Text textAlign="center">👆를 클릭해 프로필 이미지를 추가해보세요.</Text>
        </FormControl>
        <FormControl isInvalid={!!errors.email} mb={2}>
          <FormLabel>이메일</FormLabel>
          <Input type="email" {...register('email')} />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.name} mb={2}>
          <FormLabel>이름</FormLabel>
          <Input {...register('name')} />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} mb={2}>
          <FormLabel>비밀번호</FormLabel>
          <PasswordInput />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.confirmPassword} mb={2}>
          <FormLabel>비밀번호 확인</FormLabel>
          <PasswordInput
            type={passwordTypeEnum.ConfirmPassword}
            borderWidth="1px"
            borderColor="inherit"
            opacity="1 !important"
          />
          <FormErrorMessage>
            {errors.confirmPassword && String(errors.confirmPassword.message)}
          </FormErrorMessage>
        </FormControl>
        <SubmitButton isLoading={isLoading}>회원가입</SubmitButton>
      </form>
    </FormProvider>
  );
}
