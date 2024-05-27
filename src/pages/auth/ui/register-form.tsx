import { Box, Input, Text, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { imageQueries } from '@/entities/image';
import { profileQueries, profileApi } from '@/entities/profile';
import { sessionQueries, sessionTypes, sessionSchemas } from '@/entities/session';
import { FormItem, SubmitButton, UploadedAvatar } from '@/shared/ui/form';

import { PasswordInput, passwordTypeEnum } from './password-input';

const useRegister = () => {
  const toast = useToast();
  const signUpMutation = sessionQueries.useSignUpMutation();
  const createProfileMutation = profileQueries.useCreateProfileMutation();
  const uploadImageMutation = imageQueries.useUploadImageMutation();

  const isPending =
    signUpMutation.isPending || createProfileMutation.isPending || uploadImageMutation.isPending;

  const onSubmit: SubmitHandler<sessionTypes.SignUpUserDto> = async (values) => {
    if (isPending) return;
    console.log(values);
    const email = await profileApi.getProfileByEmail(values.email);
    if (email) {
      return toast({
        title: '이미 등록된 이메일입니다.',
        position: 'top',
        status: 'error',
      });
    }
    try {
      const signUpResult = await signUpMutation.mutateAsync(values);
      if (signUpResult) {
        const { id } = signUpResult;
        const { name, email } = values;
        let { image } = values;

        if (image) {
          image = await uploadImageMutation.mutateAsync({
            image: image[0],
            storageName: 'profile',
          });
        }

        createProfileMutation.mutate({ authId: id, name, image, email });
      }
    } catch (error) {
      toast({
        title: '회원가입에 실패했습니다.',
        position: 'top',
        status: 'error',
      });
    }
  };

  return { onSubmit, isPending };
};

export function RegisterForm() {
  const { onSubmit, isPending } = useRegister();
  const methods = useForm<sessionTypes.SignUpUserDto>({
    resolver: zodResolver(sessionSchemas.SignUpUserDtoSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mx={{ base: 4, md: 0 }}>
          <FormItem
            labelContent={<UploadedAvatar name="image" />}
            labelProps={{
              htmlFor: 'image',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <Input type="file" id="image" accept="image/*" display="none" {...register('image')} />
          </FormItem>
          <Text textAlign="center" my={4}>
            👆를 클릭해 프로필 이미지를 추가해보세요.
          </Text>
          <FormItem labelContent="이메일" error={errors.email} mb={3}>
            <Input type="email" {...register('email')} />
          </FormItem>
          <FormItem labelContent="이름" error={errors.name} mb={3}>
            <Input {...register('name')} />
          </FormItem>
          <FormItem labelContent="비밀번호" error={errors.password} mb={4}>
            <PasswordInput />
          </FormItem>
          <FormItem labelContent="비밀번호" error={errors.confirmPassword} mb={4}>
            <PasswordInput
              type={passwordTypeEnum.ConfirmPassword}
              borderWidth="1px"
              borderColor="inherit"
              opacity="1 !important"
            />
          </FormItem>
          <SubmitButton isLoading={isPending} isDisabled={!isValid}>
            회원가입
          </SubmitButton>
        </Box>
      </form>
    </FormProvider>
  );
}
