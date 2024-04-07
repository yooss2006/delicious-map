import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { SignUpFormValues } from '@/entities/auth';
import { useProfileImageUpload } from '@/features/auth/profile-image-upload';
import { useSignUp } from '@/features/auth/sign-up';
import { SubmitButton } from '@/shared/ui/form';
import { RegisterForm } from '@/widgets/auth-form';

const userSchema = z
  .object({
    nickname: z.string().min(2, '닉네임은 필수 입니다.'),
    email: z.string().min(1, '이메일은 필수입니다.').email('올바른 이메일 형식이 아닙니다.'),
    confirmPassword: z.any(),
    profileImage: z.any(),
    password: z
      .string()
      .min(8, '비밀번호는 8글자 이상 입력해야 합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()]).{8,}$/,
        '비밀번호는 영문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export function RegisterPage() {
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(userSchema),
  });

  const { mutateAsync: uploadImage, isPending: isUploadLoading } = useProfileImageUpload();
  const { mutate: signUp, isPending: isSignUpLoading } = useSignUp();
  const isLoading = isUploadLoading || isSignUpLoading;

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<SignUpFormValues> = async (values) => {
    if (isLoading) return;
    const image = await uploadImage({ image: values.profileImage?.[0], storageName: 'profile' });
    signUp({
      ...values,
      profileImage: image,
    });
  };

  return (
    <Box>
      <Heading as="h2" size="xl" textAlign="center" color="green.50" _dark={{ color: 'gray.200' }}>
        회원가입
      </Heading>
      <Text mt={2} color="green.800" textAlign="center" _dark={{ color: 'gray.300' }}>
        회원가입을 환영합니다.
      </Text>
      <Divider my={4} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RegisterForm />
          <SubmitButton isLoading={isLoading}>회원가입</SubmitButton>
        </form>
      </FormProvider>
    </Box>
  );
}
